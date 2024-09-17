import API from "../api"
import {Category} from "../endpoints"

export const saveCategory = (data) => {
    return API.post(`${Category}`, data)
}
export const updateCategory = (data) => {
    return API.put(`${Category}`, data, {params: { _id: data._id }},)
}
export const getSingleCategory = (data) => {
    return API.get(`${Category}/getSingleCategory`, { params: { _id: data } })
}
export const getallCategory = () => {
    return API.get(`${Category}`)
}
export const deleteCategory = (data) => {
    return API.delete(`${Category}`, { params: { _id: data } });
  };

  export const getFilterCategory = (data) => {
    return API.put(`${Category}/getFilterCategory`, data);
  };