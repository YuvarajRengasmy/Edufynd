import API from "../api"
import { StudnetEnquiry } from "../endpoints"

export const saveStudnetEnquiry = (data) => {
    return API.post(`${StudnetEnquiry}`, data)
}

export const updateStudnetEnquiry= (data) => {
    return API.put(`${StudnetEnquiry}`, data)
}
export const activeClient = (data) => {
  return API.post(`${StudnetEnquiry}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${StudnetEnquiry}/deActive`,data);
};
export const assignStaffToEnquiries = (data) => {
  return API.post(`${StudnetEnquiry}/assign`,data);
};

export const getSingleStudnetEnquiry = (data) => {
    return API.get(`${StudnetEnquiry}/getSingleStudentEnquiry`, { params: { _id: data } })
}
export const getSingleLogUniversity = (data) => {
    return API.get(`${StudnetEnquiry}/SingleLog`, { params: { _id: data } });
  };
export const getallStudnetEnquiry = () => {
    return API.get(`${StudnetEnquiry}`)
}
export const deleteStudnetEnquiry= (data) => {
    return API.delete(`${StudnetEnquiry}`, { params: { _id: data } });
  };

  export const getFilterStudnetEnquiry= (data) => {
    return API.put(`${StudnetEnquiry}/getFilterStudentEnquiry`, data);
  };






