import API from "../api"
import {DialCode} from "../endpoints"

export const saveSource = (data) => {
    return API.post(`${DialCode}`, data)
}
export const updateSource = (data) => {
    return API.put(`${DialCode}`, data, {params: { _id: data._id }},)
}
export const getSingleSource = (data) => {
    return API.get(`${DialCode}/getSingleSource`, { params: { _id: data } })
}
export const getallCode = () => {
    return API.get(`${DialCode}`)
}
export const deleteSource = (data) => {
    return API.delete(`${DialCode}`, { params: { _id: data } });
  };

  export const getFilterSource = (data) => {
    return API.put(`${DialCode}/getFilterSource`, data);
  };