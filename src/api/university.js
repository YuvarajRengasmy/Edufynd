import API from "./api"
import {University } from "./endpoints"

export const saveUniversity = (data) => {
    return API.post(`${University}`, data)
}

export const getallUniversity = () => {
    return API.get(`${University}/getalluniversity`)
}
export const getFilterUniversity = (data) => {
  return API.put(`${University}/getfilteruniversity`, data);
};
export const getSingleUniversity = (data) => {
    return API.get(`${University}/getsingleuniversity`, { params: { _id: data } });
  };
  export const deleteUniversity = (data) => {
    return API.delete(`${University}`, { params: { _id: data } });
  };
  export const updateUniversity = (data) => {
    return API.put(`${University}`, data);
  };

  export const getAllUniversityForWeb = (data) => {
    return API.get(`${University}/getalluniversityforweb`, data);
  };

  export const UniversityProgram = (data) => {
    return API.get(`${University}/getprogrambyuniversity`, { params: { universityId: data } });
  };




