import API from "../api"
import { ApplicationStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${ApplicationStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${ApplicationStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${ApplicationStatus}/getSingleApplicationStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${ApplicationStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${ApplicationStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${ApplicationStatus}/getFilterApplicationStatus`, data);
  };