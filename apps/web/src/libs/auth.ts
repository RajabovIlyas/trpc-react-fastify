import { TOKEN_KEY } from '../constants';

export const saveAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAccessToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
