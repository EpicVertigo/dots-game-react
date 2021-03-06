import { store } from '../store';
import headers from './helpers/requests';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const FETCH_TOKEN_BEGIN = 'FETCH_TOKEN_BEGIN';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';

export function isLoggedIn() {
  return store.getState().token.value !== null;
}

export const fetchTokenBegin = () => ({
  type: FETCH_TOKEN_BEGIN,
});

export const fetchTokenSuccess = token => ({
  type: FETCH_TOKEN_SUCCESS,
  data: { token },
});

export const fetchTokenError = error => ({
  type: FETCH_TOKEN_ERROR,
  data: error,
});

export function removeToken() {
  return {
    type: REMOVE_TOKEN,
  };
}

function handleErrors(response) {
  if (!response.ok) {
    const errorDetails = { message: response.statusText, status: response.status };
    throw errorDetails;
  }
  return response.text();
}

export function fetchToken(username, password, endpoint) {
  return dispatch => {
    dispatch(fetchTokenBegin());
    return fetch(endpoint, headers.authorization(username, password))
      .then(handleErrors)
      .then(response => {
        const data = JSON.parse(response);
        dispatch(fetchTokenSuccess(data.token));
        return data.token;
      })
      .catch(error => {
        dispatch(fetchTokenError(error));
      });
  };
}
