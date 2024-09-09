import API from "./api"
import { Admin } from "./endpoints"

export const saveAdmin = (data) => {
    return API.post(`${Admin}`, data)
}

export const getallAdmin = () => {
    return API.get(`${Admin}`)
}

export const deleteAdmin = (data) => {
    return API.delete(`${Admin}`, { params: { _id: data } });
  };
  export const updateAdmin = (data) => {
    return API.put(`${Admin}`, data)
}
export const getSingleAdmin = (data) => {
    return API.get(`${Admin}/getsingleadmin`, { params: { _id: data } })
}
export const createStaff = (data) => {
    return API.post(`${Admin}/createStaffByAdmin`, data)
}
export const editStaff = (data) => {
    return API.post(`${Admin}/editStaffByAdmin`, data)
}

