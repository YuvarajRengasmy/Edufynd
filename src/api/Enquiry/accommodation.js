import API from "../api"
import { Accommodation } from "../endpoints"

export const saveAccommodationEnquiry = (data) => {
    return API.post(`${Accommodation}`, data)
}

export const updateAccommodationEnquiry= (data) => {
    return API.put(`${Accommodation}`, data)
}
export const activeClient = (data) => {
    return API.post(`${Accommodation}/active`,data);
  };
  
  export const deactivateClient = (data) => {
    return API.post(`${Accommodation}/deActive`,data);
  };
  export const assignStaffToEnquiries = (data) => {
    return API.post(`${Accommodation}/assign`,data);
  };
export const getSingleLogUniversity = (data) => {
    return API.get(`${Accommodation}/SingleLog`, { params: { _id: data } });
};
export const getSingleAccommodationEnquiry = (data) => {
    return API.get(`${Accommodation}/getSingleAccommodation`, { params: { _id: data } })
}
export const getallAccommodationEnquiry = () => {
    return API.get(`${Accommodation}`)
}
export const deleteAccommodationEnquiry= (data) => {
    return API.delete(`${Accommodation}`, { params: { _id: data } });
  };

  export const getFilterAccommodationEnquiry= (data) => {
    return API.put(`${Accommodation}/getFilterAccommodation`, data);
  };






