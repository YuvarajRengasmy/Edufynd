import API from "./api"
import { Agent } from "./endpoints"

export const saveAgent = (data) => {
    return API.post(`${Agent}`, data)
}
export const saveContact = (data) => {
    return API.post(`${Agent}/contact`, data);
  };

  export const updateAgent = (data) => {
    return API.put(`${Agent}/update`, data)
}
export const getSingleAgent = (data) => {
    return API.get(`${Agent}/getsingleagent`, { params: { _id: data } })
}


  export const getallAgent = () => {
    return API.get(`${Agent}`)
}
export const getFilterAgent = (data) => {
  return API.put(`${Agent}/getuniversityfilterAgent`, data);
};
export const deleteAgent = (data) => {
    return API.delete(`${Agent}`, { params: { _id: data } });
  };





