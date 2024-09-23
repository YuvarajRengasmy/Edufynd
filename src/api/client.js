import API from "./api"
import { Client } from "./endpoints"

export const saveClient = (data) => {
    return API.post(`${Client}`, data)
}

export const getallClient = () => {
    return API.get(`${Client}/`)
}

export const getAllClientCard = () => {
  return API.get(`${Client}/card`)
}

export const getSingleClient = (data) => {
    return API.get(`${Client}/getSingleClient`, { params: { _id: data } });
  };
  export const getSingleClientLog = (data) => {
    return API.get(`${Client}/SingleLog`, { params: { _id: data } });
  };
  export const deleteClient = (data) => {
    return API.delete(`${Client}`, { params: { _id: data } });
  };
  export const activeClient = (data) => {
    return API.post(`${Client}/activeClient`,data);
  };

  export const deactivateClient = (data) => {
    return API.post(`${Client}/deActiveClient`,data);
  };

  export const updateClient = (data) => {
    return API.put(`${Client}`,  data);
  };

  export const getFilterClient = (data) => {
    return API.put(`${Client}/getFilterClient`, data);
  };

  export const getLogsClient = () => {
    return API.get(`${Client}/logs`)
  }