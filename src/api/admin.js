import API from "./api"
import { Admin } from "./endpoints"

export const saveAdmin = (data) => {
    return API.post(`${Admin}`, data)
}

export const getallAdmin = () => {
    return API.get(`${Admin}/getallAdmin`)
}






