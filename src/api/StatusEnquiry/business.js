import API from "../api"
import { BusinessStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${BusinessStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${BusinessStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${BusinessStatus}/getSingleBusinessStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${BusinessStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${BusinessStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${BusinessStatus}/getFilterBusinessStatus`, data);
  };