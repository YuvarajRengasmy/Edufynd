import API from "./api"
import {Program } from "./endpoints"

export const saveProgram = (data) => {
    return API.post(`${Program}`, data)
}

export const getallProgram = () => {
    return API.get(`${Program}`)
}
export const getFilterProgram = (data) => {
  return API.put(`${Program}/getUniversityFilterProgram`, data);
};
export const getSingleProgram = (data) => {
    return API.get(`${Program}/getSingleProgram`, { params: { _id: data } });
  };
  export const deleteProgram = (data) => {
    return API.delete(`${Program}`, { params: { _id: data } });
  };

  export const getAllProgramForWeb = (data) => {
    return API.get(`${Program}/getAllProgramForWeb`, data);
  };
  export const getUniversityProgram = (data) => {
    return API.get(`${Program}/programDetails`, data);
  };

  export const updatedProgram = (data) => {
    return API.put(`${Program}`, data);
  };