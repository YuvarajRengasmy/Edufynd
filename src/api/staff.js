import API from "./api"
import { Staff } from "./endpoints"

export const saveStaff = (data) => {
    return API.post(`${Staff}/createStaffBySuperAdmin`, data)
}

export const getallStaff = () => {
    return API.get(`${Staff}/`)
}
export const getallStaffLog = () => {
    return API.get(`${Staff}/logs`)
}

export const deleteStaff = (data) => {
    return API.delete(`${Staff}`, { params: { _id: data } });
  };
  
  export const updateStaff = (data) => {
    return API.put(`${Staff}`, data)
}

export const activeClient = (data) => {
    return API.post(`${Staff}/activeStaff`,data);
  };
  
  export const deactivateClient = (data) => {
    return API.post(`${Staff}/deActiveStaff`,data);
  };
export const getSingleStaff = (data) => {
    return API.get(`${Staff}/getSingleStaff`, { params: { _id: data } })
}
export const getSingleStaffLog = (data) => {
    return API.get(`${Staff}/SingleLog`, { params: { _id: data } })
}

export const getFilterStaffSuperAdmin = (data) => {
    return API.put(`${Staff}/getFilterStaffSuperAdmin`, data);
  };
