import { getToken } from "./storage";

export const isAuthenticated = () => {
  return getToken() != null ? true : false;
};
