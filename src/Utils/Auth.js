import { getToken } from "./Storage";

export const isAuthenticated = () => {
  return getToken() != null ? true : false;
};
