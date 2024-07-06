import API from "../api"
import { Accommodation } from "../endpoints"

export const saveAccommodationEnquiry = (data) => {
    return API.post(`${Accommodation}`, data)
}

export const updateAccommodationEnquiry= (data) => {
    return API.put(`${Accommodation}`, data)
}



export const getSingleAccommodationEnquiry = (data) => {
    return API.get(`${Accommodation}/getSingleLoanEnquiry`, { params: { _id: data } })
}
export const getallAccommodationEnquiry = () => {
    return API.get(`${Accommodation}`)
}
export const deleteAccommodationEnquiry= (data) => {
    return API.delete(`${Accommodation}`, { params: { _id: data } });
  };

  export const getFilterAccommodationEnquiry= (data) => {
    return API.put(`${Accommodation}/getFilterLoanEnquiry`, data);
  };






