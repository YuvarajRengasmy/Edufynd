import API from "../api"
import { SenderInvoice } from "../endpoints"

export const saveFSenderInvoice = (data) => {
    return API.post(`${SenderInvoice}/senderInvoice`, data)
}

export const updateFlightEnquiry= (data) => {
    return API.put(`${SenderInvoice}`, data)
}



export const getSingleFlightEnquiry = (data) => {
    return API.get(`${SenderInvoice}/getSingleFlightEnquiry`, { params: { _id: data } })
}
export const getallFlightEnquiry = () => {
    return API.get(`${SenderInvoice}`)
}
export const deleteFlightEnquiry= (data) => {
    return API.delete(`${SenderInvoice}`, { params: { _id: data } });
  };

  export const getFilterFlightEnquiry= (data) => {
    return API.put(`${SenderInvoice}/getFilterFlightEnquiry`, data);
  };






