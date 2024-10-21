import API from "../api"
import { BusinessEnquiry } from "../endpoints"

export const saveBusinessEnquiry = (data) => {
    return API.post(`${BusinessEnquiry}`, data)
}
export const statusApplication = (data) => {
  return API.put(`${BusinessEnquiry}/status`, data);
};
export const updateBusinessEnquiry= (data) => {
    return API.put(`${BusinessEnquiry}`, data)
}
export const activeClient = (data) => {
    return API.post(`${BusinessEnquiry}/active`,data);
  };
  
  export const deactivateClient = (data) => {
    return API.post(`${BusinessEnquiry}/deActive`,data);
  };
  export const assignStaffToEnquiries = (data) => {
    return API.post(`${BusinessEnquiry}/assign`,data);
  };

export const getSingleBusinessEnquiry = (data) => {
    return API.get(`${BusinessEnquiry}/getSingleBusinessEnquiry`, { params: { _id: data } })
}

export const getSingleLogUniversity = (data) => {
    return API.get(`${BusinessEnquiry}/SingleLog`, { params: { _id: data } });
};
export const getallBusinessEnquiry = () => {
    return API.get(`${BusinessEnquiry}`)
}
export const deleteBusinessEnquiry= (data) => {
    return API.delete(`${BusinessEnquiry}`, { params: { _id: data } });
  };

  export const getFilterBusinessEnquiry= (data) => {
    return API.put(`${BusinessEnquiry}/getFilterBusinessEnquiry`, data);
  };






