import API from "./api"
import { Student } from "./endpoints"

export const saveStudent = (data) => {
    return API.post(`${Student}`, data)
}
export const updateStudent = (data) => {
    return API.put(`${Student}`, data)
}
export const getSingleStudent = (data) => {
    return API.get(`${Student}/getSingleStudent`, { params: { _id: data } })
}





