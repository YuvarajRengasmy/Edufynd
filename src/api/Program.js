import API from "./api"
import {Program } from "./endpoints"

export const saveProgram = (data) => {
    return API.post(`${Program}`, data)
}

export const getallProgram = () => {
    return API.get(`${Program}/getallprogram`)
}
export const getFilterProgram = (data) => {
  return API.put(`${Program}/getuniversityfilterprogram`, data);
};
export const getSingleProgram = (data) => {
    return API.get(`${Program}/getsingleprogram`, { params: { _id: data } });
  };
  export const deleteProgram = (data) => {
    return API.delete(`${Program}`, { params: { _id: data } });
  };

  export const getAllProgramForWeb = (data) => {
    return API.get(`${Program}/getallprogramforweb`, data);
  };
  export const getUniversityProgram = (data) => {
    return API.get(`${Program}/programDetails`, data);
  };

  export const updatedProgram = (data) => {
    return API.put(`${Program}`, data);
  };
