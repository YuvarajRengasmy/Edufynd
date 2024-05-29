import API from "./api"
import { Client } from "./endpoints"

export const saveClient = (data) => {
    return API.post(`${Client}`, data)
}

export const getallClient = () => {
    return API.get(`${Client}/getallclient`)
}

export const getSingleClient = (data) => {
    return API.get(`${Client}/getsingleclient`, { params: { _id: data } });
  };
  export const deleteClient = (data) => {
    return API.delete(`${Client}`, { params: { _id: data } });
  };
  export const updateClient = (data) => {
    return API.put(`${Client}`, data);
  };