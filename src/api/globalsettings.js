import API from "./api"
import { Country } from "./endpoints"

export const saveCountry = (data) => {
    return API.post(`${Country}`, data)
}
// export const updateStudent = (data) => {
//     return API.put(`${Student}/update`, data)
// }
// export const getSingleStudent = (data) => {
//     return API.get(`${Student}/getsinglestudent`, { params: { _id: data } })
// }
// export const saveContact = (data) => {
//     return API.post(`${Student}/contact`, data);
//   };




