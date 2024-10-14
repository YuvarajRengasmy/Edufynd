import API from "../api"
import { FlightStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${FlightStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${FlightStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${FlightStatus}/getSingleFlightStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${FlightStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${FlightStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${FlightStatus}/getFilterFlightStatus`, data);
  };