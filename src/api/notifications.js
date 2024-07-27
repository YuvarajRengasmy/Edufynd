import API from "./api";
import {Notifications} from './endpoints'

export const saveNotifications = (data) => {
    return API.post(`${Notifications}`, data)
}


export const getallNotifications = () => {
    return API.get(`${Notifications}`)
}
