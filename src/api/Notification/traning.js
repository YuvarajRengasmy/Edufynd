import API from "../api";
import {Training} from '../endpoints'

export const saveTraining = (data) => {
    return API.post(`${Training}`, data)
}


export const getallTraining = () => {
    return API.get(`${Training}`)
}


export const getSingleTraining = (data) => {
    return API.get(`${Training}/getSingleTraining`, { params: { _id: data } });
  };

export const updatedTraining = (data) => {
    return API.put(`${Training}`, data);
  };


export const deleteTraining = (data) => {
    return API.delete(`${Training}`, { params: { _id: data } });
  };