import API from "./api"
import { Student } from "./endpoints"

export const saveStudent = (data) => {
    return API.post(`${Student}`, data)
}
export const updateStudent = (data) => {
    return API.put(`${Student}/update`, data)
}
export const getSingleStudent = (data) => {
    return API.get(`${Student}/getsinglestudent`, { params: { _id: data } })
}
export const saveContact = (data) => {
    return API.post(`${Student}/contact`, data);
  };

  export const getallStudent = () => {
    return API.get(`${Student}`)
}
export const getFilterStudent = (data) => {
  return API.put(`${Student}/getFilterStudentbySuperAdmin`, data);
};
export const deleteStudent = (data) => {
    return API.delete(`${Student}`, { params: { _id: data } });
  };

