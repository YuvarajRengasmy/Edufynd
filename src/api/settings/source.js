import API from "../api"
import {Source} from "../endpoints"

export const saveSource = (data) => {
    console.log("ggg", data)
    return API.post(`${Source}`, data)
}
export const updateSource = (data) => {
    return API.put(`${Source}`, data, {params: { _id: data._id }},)
}
export const getSingleSource = (data) => {
    return API.get(`${Source}/getSingleSource`, { params: { _id: data } })
}
export const getallSource = () => {
    return API.get(`${Source}`)
}
export const deleteSource = (data) => {
    return API.delete(`${Source}`, { params: { _id: data } });
  };

  export const getFilterSource = (data) => {
    return API.put(`${Source}/getFilterSource`, data);
  };