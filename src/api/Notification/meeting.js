import API from "../api";
import { Meeting} from '../endpoints'

export const saveMeeting = (data) => {
    return API.post(`${Meeting}`, data)
}


export const getallMeeting = () => {
    return API.get(`${Meeting}`)
}
export const activeClient = (data) => {
  return API.post(`${Meeting}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${Meeting}/deActive`,data);
};

export const getSingleMeeting = (data) => {
    return API.get(`${Meeting}/getSingleMeeting`, { params: { _id: data } });
  };

export const updatedMeeting = (data) => {
    return API.put(`${Meeting}`, data);
  };


export const deleteMeeting = (data) => {
    return API.delete(`${Meeting}`, { params: { _id: data } });
  };

  export const getFilterMeeting = (data) => {
    return API.put(`${Meeting}/getFilterMeeting`, data);
  };