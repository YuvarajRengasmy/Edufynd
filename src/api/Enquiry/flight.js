import API from "../api"
import { Flight } from "../endpoints"

export const saveFlightEnquiry = (data) => {
    return API.post(`${Flight}`, data)
}

export const updateFlightEnquiry= (data) => {
    return API.put(`${Flight}`, data)
}



export const getSingleFlightEnquiry = (data) => {
    return API.get(`${Flight}/getSingleFlightEnquiry`, { params: { _id: data } })
}
export const getallFlightEnquiry = () => {
    return API.get(`${Flight}`)
}
export const deleteFlightEnquiry= (data) => {
    return API.delete(`${Flight}`, { params: { _id: data } });
  };

  export const getFilterFlightEnquiry= (data) => {
    return API.put(`${Loan}/getFilterFlightEnquiry`, data);
  };






