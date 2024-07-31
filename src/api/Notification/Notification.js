import API from "../api";
import {Notifications} from '../endpoints'

export const saveNotifications = (data) => {
    return API.post(`${Notifications}`, data)
}


export const getallNotifications = () => {
    return API.get(`${Notifications}`)
}


export const getSingleNotifications = (data) => {
    return API.get(`${Notifications}/getSingleNotification`, { params: { _id: data } });
  };

export const updatedNotifications = (data) => {
    return API.put(`${Notifications}`, data);
  };

  export const getFilterNotification = (data) => {
    return API.put(`${Notifications}/getFilterNotification`, data);
  };


export const deleteProgram = (data) => {
    return API.delete(`${Notifications}`, { params: { _id: data } });
  };