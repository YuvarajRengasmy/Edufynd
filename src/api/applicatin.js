import API from "./api"
import { Application} from "./endpoints"

export const saveApplication = (data) => {
    return API.put(`${Application}`, data)
}

export const getallApplication = () => {
    return API.get(`${Application}/`)
}

export const getSingleApplication = (data) => {
    return API.get(`${Application}/getSingleApplication`, { params: { _id: data } });
  };
  export const deleteApplication = (data) => {
    return API.delete(`${Application}`, { params: { _id: data } });
  };
  export const updateApplication = (data) => {
    return API.put(`${Application}`, data);
  };