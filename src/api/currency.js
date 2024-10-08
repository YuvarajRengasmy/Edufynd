import API from "./api"
import {Currency} from "./endpoints"

export const saveCurrency = (data) => {
    return API.post(`${Currency}`, data)
}

export const updateCurrency = (data) => {
    return API.put(`${Currency}`, data, {params: { _id: data._id }},)
}
export const getSingleCurrency = (data) => {
    return API.get(`${Currency}/getSingleCurrency`, { params: { _id: data } })
}
export const getallCurrency = () => {
    return API.get(`${Currency}/`)
}
export const deleteCurrency = (data) => {
    return API.delete(`${Currency}`, { params: { _id: data } });
  };

  export const getFilterCurrency = (data) => {
    return API.put(`${Currency}/getFilterCurrency`, data);
  };


