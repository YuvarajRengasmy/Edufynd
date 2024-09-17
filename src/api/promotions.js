import API from "./api";
import {Promotion} from './endpoints'

export const savePromotion = (data) => {
    return API.post(`${Promotion}`, data)
}


export const getallPromotion = () => {
    return API.get(`${Promotion}`)
}


export const getSinglePromotion = (data) => {
    return API.get(`${Promotion}/getSinglePromotion`, { params: { _id: data } });
  };

export const updatedPromotion = (data) => {
    return API.put(`${Promotion}`, data);
  };


export const deletePromotion = (data) => {
    return API.delete(`${Promotion}`, { params: { _id: data } });
  };