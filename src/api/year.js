import API from "./api"
import { Year} from "./endpoints"

export const saveYear = (data) => {
    return API.post(`${Year}`, data)
}
export const updateYear = (data) => {
    return API.put(`${Year}`, data, {params: { _id: data._id }},)
}
export const getSingleYear = (data) => {
    return API.get(`${Year}/getSingleYear`, { params: { _id: data } })
}
export const getallYear = () => {
    return API.get(`${Year}`)
}
export const deleteYear = (data) => {
    return API.delete(`${Year}`, { params: { _id: data } });
  };

  export const getFilterYear = (data) => {
    return API.put(`${Year}/getFilterYear`, data);
  };