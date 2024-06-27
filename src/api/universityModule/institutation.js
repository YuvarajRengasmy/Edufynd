import API from "../api"
import { Institution } from "../endpoints"

export const saveModule = (data) => {
    return API.post(`${Institution}`, data)
}

export const updateModule= (data) => {
    return API.put(`${Institution}`, data)
}


export const getSingleAllModule = (data) => {
    return API.get(`${Institution}/getSingleInstitutionType`, { params: { _id: data } })
}
export const getallInstitutionModule = () => {
    return API.get(`${Institution}`)
}
export const deleteModule= (data) => {
    return API.delete(`${Institution}`, { params: { _id: data } });
  };

  export const getFilterModule= (data) => {
    return API.put(`${Institution}/getFilterInstitutionType`, data);
  };






