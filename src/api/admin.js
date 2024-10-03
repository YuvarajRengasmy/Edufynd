import API from "./api"
import { Admin } from "./endpoints"

export const saveAdmin = (data) => {
    return API.post(`${Admin}`, data)
}

export const getallAdmin = () => {
    return API.get(`${Admin}`)
}

export const getAllAdminCard = () => {
    return API.get(`${Admin}/card`)
}

export const deleteAdmin = (data) => {
    return API.delete(`${Admin}`, { params: { _id: data } });
  };
  export const updateAdmin = (data) => {
    return API.put(`${Admin}`, data)
}
export const getSingleAdmin = (data) => {
    return API.get(`${Admin}/getSingleAdmin`, { params: { _id: data } })
}
export const createStaff = (data) => {
    return API.post(`${Admin}/createStaffByAdmin`, data)
}
export const createAdminBySuperAdmin = (data) => {
    return API.post(`${Admin}/createAdminBySuperAdmin`, data)
}

export const editStaff = (data) => {
    return API.post(`${Admin}/editStaffByAdmin`, data)
}

export const editAdminBySuperAdmin = (data) => {
    return API.put(`${Admin}/editAdminBySuperAdmin`, data)
}



export const getFilterAdmins = (data) => {
    return API.put(`${Admin}/getFilterAdmin`, data)
}