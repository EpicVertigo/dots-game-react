import { store } from '../../store';

function apiGet() {
  const { token } = store.getState();
  if (token.value !== null) {
    return {
      method: 'GET',
      headers: { Authorization: `Token ${token.value}` },
    };
  }
  return {};
}

function apiPost(body) {
  const { token } = store.getState();
  if (token.value !== null) {
    return {
      crossDomain: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token.value}`,
      },
      body,
    };
  }
  return {};
}

function authorization(username, password) {
  return {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
}

export default {
  authorization,
  apiPost,
  apiGet,
};
