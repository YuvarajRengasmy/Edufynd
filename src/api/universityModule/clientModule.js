import API from "../api"
import {TypeOfClient } from "../endpoints"

export const saveModule = (data) => {
    return API.post(`${TypeOfClient}`, data)
}

export const updateModule= (data) => {
    return API.put(`${TypeOfClient}`, data)
}


export const getSingleAllModule = (data) => {
    return API.get(`${TypeOfClient}/getSingleTypeOfClient`, { params: { _id: data } })
}
export const getallClientModule = () => {
    return API.get(`${TypeOfClient}`)
}
export const deleteModule= (data) => {
    return API.delete(`${TypeOfClient}`, { params: { _id: data } });
  };

  export const getFilterModule= (data) => {
    return API.put(`${TypeOfClient}/getFilterTypeOfClient`, data);
  };






