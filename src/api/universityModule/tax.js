import API from "../api"
import { Tax} from "../endpoints"

export const saveModule = (data) => {
    return API.post(`${Tax}`, data)
}

export const updateModule= (data) => {
    return API.put(`${Tax}`, data)
}


export const getSingleAllModule = (data) => {
    return API.get(`${Tax}/getSingleTax`, { params: { _id: data } })
}
export const getallTaxModule = () => {
    return API.get(`${Tax}`)
}
export const deleteModule= (data) => {
    return API.delete(`${Tax}`, { params: { _id: data } });
  };

  export const getFilterModule= (data) => {
    return API.put(`${Tax}/getFilterTax`, data);
  };






