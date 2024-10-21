import API from "../api"
import { GeneralStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${GeneralStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${GeneralStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${GeneralStatus}/getSingleGeneralStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${GeneralStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${GeneralStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${GeneralStatus}/getFilterGeneralStatus`, data);
  };