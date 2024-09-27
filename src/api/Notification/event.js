import API from "../api";
import {Event} from '../endpoints'

export const saveEvent = (data) => {
    return API.post(`${Event}`, data)
}


export const getallEvent = () => {
    return API.get(`${Event}`)
}

export const activeClient = (data) => {
  return API.post(`${Event}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${Event}/deActive`,data);
};
export const getSingleEvent = (data) => {
    return API.get(`${Event}/getSingleEvent`, { params: { _id: data } });
  };

export const updatedEvent = (data) => {
    return API.put(`${Event}`, data);
  };


export const deleteEvent = (data) => {
    return API.delete(`${Event}`, { params: { _id: data } });
  };

  export const getFilterEvent = (data) => {
    return API.put(`${Event}/getFilterEvent`, data);
  };