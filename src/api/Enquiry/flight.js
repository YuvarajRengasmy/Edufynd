import API from "../api"
import { Flight } from "../endpoints"

export const saveFlightEnquiry = (data) => {
    return API.post(`${Flight}`, data)
}

export const updateFlightEnquiry= (data) => {
    return API.put(`${Flight}`, data)
}
export const statusApplication = (data) => {
  return API.put(`${Flight}/status`, data);
};
export const activeClient = (data) => {
  return API.post(`${Flight}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${Flight}/deActive`,data);
};
export const assignStaffToEnquiries = (data) => {
  return API.post(`${Flight}/assign`,data);
};

export const getSingleFlightEnquiry = (data) => {
    return API.get(`${Flight}/getSingleFlightEnquiry`,{params: {_id:data}})
}

export const getSingleLogUniversity = (data) => {
    return API.get(`${Flight}/SingleLog`, { params: { _id: data } });
  };
export const getallFlightEnquiry = () => {
    return API.get(`${Flight}`)
}
export const deleteFlightEnquiry= (data) => {
    return API.delete(`${Flight}`, { params: { _id: data } });
  };

  export const getFilterFlightEnquiry= (data) => {
    return API.put(`${Flight}/getFilterFlightEnquiry`, data);
  };






