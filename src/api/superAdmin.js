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