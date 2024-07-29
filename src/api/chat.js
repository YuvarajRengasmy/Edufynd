import API from "./api";
import { Chat } from "./endpoints";
export const postChat = (data) => {
  return API.post(`${Chat}/userChat`, data);
};
export const getMessages = (data) => {
  return API.get(`${Chat}/`, data);
};
