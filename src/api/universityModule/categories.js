import API from "../api"
import { Categories } from "../endpoints"

export const saveCategories = (data) => {
    return API.post(`${Categories}`, data)
}

export const updateCategories= (data) => {
    return API.put(`${Categories}`, data)
}


export const getSingleAllCategories = (data) => {
    return API.get(`${Categories}/getSinglePopularCategory`, { params: { _id: data } })
}
export const getallCategories = () => {
    return API.get(`${Categories}`)
}
export const deleteCategories= (data) => {
    return API.delete(`${Categories}`, { params: { _id: data } });
  };

  export const getFilterCategories= (data) => {
    return API.put(`${Categories}/getFilterPopularCategory`, data);
  };






