import API from "../api"
import { AccommodationStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${AccommodationStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${AccommodationStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${AccommodationStatus}/getSingleAccommodationStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${AccommodationStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${AccommodationStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${AccommodationStatus}/getFilterAccommodationStatus`, data);
  };