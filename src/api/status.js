import API from "./api"
import { Status } from "./endpoints"

export const saveStatus = (data) => {
    return API.post(`${Status}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${Status}`, data)
}

export const getSingleStatus = (data) => {
    return API.get(`${Status}/getSingleStatus`, { params: { _id: data } })
}
export const getallStatus = () => {
    return API.get(`${Status}/getAllStatus`)
}
export const deleteStatus = (data) => {
    return API.delete(`${Status}`, { params: { _id: data } });
  };

  export const getFilterStatus= (data) => {
    return API.put(`${Status}/getFilterStatus`, data);
  };


