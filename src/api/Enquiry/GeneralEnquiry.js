import API from "../api"
import { GeneralEnquiry } from "../endpoints"

export const saveGeneralEnquiry = (data) => {
    return API.post(`${GeneralEnquiry}`, data)
}

export const updateGeneralEnquiry= (data) => {
    return API.put(`${GeneralEnquiry}`, data)
}
export const activeClient = (data) => {
  return API.post(`${GeneralEnquiry}/active`,data);
};
export const statusApplication = (data) => {
  return API.put(`${GeneralEnquiry}/status`, data);
};
export const deactivateClient = (data) => {
  return API.post(`${GeneralEnquiry}/deActive`,data);
};
export const assignStaffToEnquiries = (data) => {
  return API.post(`${GeneralEnquiry}/assign`,data);
};
export const getSingleGeneralEnquiry = (data) => {
    return API.get(`${GeneralEnquiry}/getSingleGeneralEnquiry`, { params: { _id: data } })
}
export const getSingleLogUniversity = (data) => {
    return API.get(`${GeneralEnquiry}/SingleLog`, { params: { _id: data } });
  };
export const getallGeneralEnquiry = () => {
    return API.get(`${GeneralEnquiry}`)
}
export const deleteGeneralEnquiry= (data) => {
    return API.delete(`${GeneralEnquiry}`, { params: { _id: data } });
  };

  export const getFilterGeneralEnquiry= (data) => {
    return API.put(`${GeneralEnquiry}/getFilterGeneralEnquiry`, data);
  };






