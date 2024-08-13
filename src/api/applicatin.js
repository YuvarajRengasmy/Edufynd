import API from "./api"
import { Application} from "./endpoints"

export const saveApplication = (data) => {
    return API.post(`${Application}`, data)
}

export const getallApplication = () => {
    return API.get(`${Application}/`)
}

export const getSingleApplication = (data) => {
    return API.get(`${Application}/getSingleApplicant`, { params: { _id: data } });
  };
  export const deleteApplication = (data) => {
    return API.delete(`${Application}`, { params: { _id: data } });
  };
  export const updateApplication = (data) => {
    return API.put(`${Application}`, data);
  };
  export const trackApplication = (data) => {
    return API.put(`${Application}/track`, data);
  };