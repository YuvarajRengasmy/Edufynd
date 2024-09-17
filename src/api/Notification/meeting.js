import API from "../api";
import { Meeting} from '../endpoints'

export const saveMeeting = (data) => {
    return API.post(`${Meeting}`, data)
}


export const getallMeeting = () => {
    return API.get(`${Meeting}`)
}


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