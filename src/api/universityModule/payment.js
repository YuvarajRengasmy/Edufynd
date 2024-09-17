import API from "../api"
import { Payment } from "../endpoints"

export const saveModule = (data) => {
    return API.post(`${Payment}`, data)
}

export const updateModule= (data) => {
    return API.put(`${Payment}`, data)
}


export const getSingleAllModule = (data) => {
    return API.get(`${Payment}/getSinglePaymentMethod`, { params: { _id: data } })
}
export const getallPaymentModule = () => {
    return API.get(`${Payment}`)
}
export const deleteModule= (data) => {
    return API.delete(`${Payment}`, { params: { _id: data } });
  };

  export const getFilterModule= (data) => {
    return API.put(`${Payment}/getFilterPaymentMethod`, data);
  };






