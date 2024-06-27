import API from "../api"
import { OfferTAT } from "../endpoints"

export const saveModule = (data) => {
    return API.post(`${OfferTAT}`, data)
}

export const updateModule= (data) => {
    return API.put(`${OfferTAT}`, data)
}


export const getSingleAllModule = (data) => {
    return API.get(`${OfferTAT}/getSingleOfferTAT`, { params: { _id: data } })
}
export const getallOfferTatModule = () => {
    return API.get(`${OfferTAT}`)
}
export const deleteModule= (data) => {
    return API.delete(`${OfferTAT}`, { params: { _id: data } });
  };

  export const getFilterModule= (data) => {
    return API.put(`${OfferTAT}/getFilterOfferTAT`, data);
  };






