import API from "../api"
import { ForexStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${ForexStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${ForexStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${ForexStatus}/getSingleForexStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${ForexStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${ForexStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${ForexStatus}/getFilterForexStatus`, data);
  };