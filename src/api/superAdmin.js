import API from "./api"
import { SuperAdmin } from "./endpoints"

export const saveSuperAdmin = (data) => {
    return API.post(`${SuperAdmin}`, data)
}


