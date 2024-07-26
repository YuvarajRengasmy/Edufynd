import API from "./api";
import {Notifications} from './endpoints'

export const saveNotifications = (data) => {
    return API.post(`${Notifications}`, data)
}

