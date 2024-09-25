import API from "./api"
import { SuperAdmin } from "./endpoints"

export const saveSuperAdmin = (data) => {
    return API.post(`${SuperAdmin}`, data)
}

export const getSuperAdmin = () => {
    return API.get(`${SuperAdmin}/getSuperAdminForSearch`)
}

export const getSuperAdminForSearch = (data) => {
    return API.get(`${SuperAdmin}/getSuperAdminForSearch`, { params: { search: data } })
}

export const getEnquiryForSearch = (data) => {
    return API.get(`${SuperAdmin}/publicGetEnquiryForSearch`, { params: { search: data } })
}
export const getCommonSearch = (data) => {
    return API.get(`${SuperAdmin}/getCommonSearch`, { params: { search: data } })
}
export const getNotificationSearch = (data) => {
    return API.get(`${SuperAdmin}/getNotificationsSearch`, { params: { search: data } })
}
export const getSingleSuperAdmin = (data) => {
    return API.get(`${SuperAdmin}/getSingleSuperAdmin`, { params: { _id: data } });
  };
  export const getallSuperAdmin = () => {
    return API.get(`${SuperAdmin}/`)
}
