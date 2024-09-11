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
export const saveContact = (data) => {
    return API.post(`${Student}/contact`, data);
  };

  export const getallStudent = () => {
    return API.get(`${Student}`)
}
export const getFilterStudent = (data) => {
  return API.put(`${Student}/getFilterStudentBySuperAdmin`, data);
};
export const getFilterStudentAdmin = (data) => {
  return API.put(`${Student}/getFilterStudent`, data);
};
export const deleteStudent = (data) => {
    return API.delete(`${Student}`, { params: { _id: data } });
  };

export const StudentSuperAdmin = (data) => {
    return API.put(`${Student}/createStudentBySuperAdmin`, data)
}

export const StudentSuperEdit = (data) => {
  return API.put(`${Student}/editStudentBySuperAdmin`, data)
}