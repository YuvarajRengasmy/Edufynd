import API from "../api";
import {Training} from '../endpoints'

export const saveTraining = (data) => {
    return API.post(`${Training}`, data)
}


export const getallTraining = () => {
    return API.get(`${Training}`)
}

export const activeClient = (data) => {
  return API.post(`${Training}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${Training}/deActive`,data);
};
export const getSingleTraining = (data) => {
    return API.get(`${Training}/getSingleTraining`, { params: { _id: data } });
  };
export const updatedTraining = (data) => {
    return API.put(`${Training}`, data);
  };

  export const getFilterTraining = (data) => {
    return API.put(`${Training}/getFilterTraining`, data);
  };
export const deleteTraining = (data) => {
    return API.delete(`${Training}`, { params: { _id: data } });
  };