import API from "./api"
import { Student } from "./endpoints"

export const saveStudent = (data) => {
    return API.post(`${Student}`, data)
}







