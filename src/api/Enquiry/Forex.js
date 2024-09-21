import API from "../api"
import { Forex } from "../endpoints"

export const saveForexEnquiry = (data) => {
    return API.post(`${Forex}`, data)
}

export const updateForexEnquiry= (data) => {
    return API.put(`${Forex}`, data)
}
export const getSingleLogUniversity = (data) => {
    return API.get(`${Forex}/SingleLog`, { params: { _id: data } });
  };
export const getSingleForexEnquiry = (data) => {
    return API.get(`${Forex}/getSingleForexEnquiry`, { params: { _id: data } })
}
export const getallForexEnquiry = () => {
    return API.get(`${ Forex }`)
}
export const deleteForexEnquiry= (data) => {
    return API.delete(`${Forex}`, { params: { _id: data } });
  };

  export const getFilterForexEnquiry= (data) => {
    return API.put(`${Forex}/getFilterForex`, data);
  };






