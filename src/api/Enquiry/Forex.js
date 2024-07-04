import API from "../api"
import { Forex } from "../endpoints"

export const saveForexEnquiry = (data) => {
    return API.post(`${Forex}`, data)
}

export const updateForexEnquiry= (data) => {
    return API.put(`${Loan}`, data)
}



export const getSingleForexEnquiry = (data) => {
    return API.get(`${Loan}/getSingleForexEnquiry`, { params: { _id: data } })
}
export const getallForexEnquiry = () => {
    return API.get(`${Loan}`)
}
export const deleteForexEnquiry= (data) => {
    return API.delete(`${Loan}`, { params: { _id: data } });
  };

  export const getFilterForexEnquiry= (data) => {
    return API.put(`${Loan}/getFilterForex`, data);
  };






