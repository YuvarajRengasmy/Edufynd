import API from "../api"
import { SenderInvoice } from "../endpoints"

export const saveFSenderInvoice = (data) => {
    return API.post(`${SenderInvoice}`, data)
}

export const updateSenderInvoice = (data) => {
    return API.put(`${SenderInvoice}`, data)
}



export const getSingleSenderInvoice = (data) => {
    return API.get(`${SenderInvoice}/getSingleSenderInvoice`, { params: { _id: data } })
}
export const getallSenderInvoice = () => {
    return API.get(`${SenderInvoice}`)
}
export const deleteSenderInvoice = (data) => {
    return API.delete(`${SenderInvoice}`, { params: { _id: data } });
  };

  export const getFilterSenderInvoice= (data) => {
    return API.put(`${SenderInvoice}/getFilterSenderInvoice`, data);
  };






