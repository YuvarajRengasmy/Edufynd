import API from "./api";
import {Promotion} from './endpoints'

export const savePromotion = (data) => {
    return API.post(`${Promotion}`, data)
}


export const getallPromotion = () => {
    return API.get(`${Promotion}`)
}

export const activeClient = (data) => {
  return API.post(`${Promotion}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${Promotion}/deActive`,data);
};
export const getSinglePromotion = (data) => {
    return API.get(`${Promotion}/getSinglePromotion`, { params: { _id: data } });
  };

export const updatedPromotion = (data) => {
    return API.put(`${Promotion}`, data);
  };
  export const getFilterPromotions = (data) => {
    return API.put(`${Promotion}/getFilterPromotion`, data);
  };

export const deletePromotion = (data) => {
    return API.delete(`${Promotion}`, { params: { _id: data } });
  };