import API from "../api"
import { Receiver } from "../endpoints"

export const saveReceiver = (data) => {
    return API.post(`${Receiver}`, data)
}

export const updateReceiver= (data) => {
    return API.put(`${Receiver}`, data)
}

export const getSingleReceiver = (data) => {
    return API.get(`${Receiver}/getSingleReceiverInvoice`, { params: { _id: data } })
}
export const getallReceiver = () => {
    return API.get(`${Receiver}`)
}
export const deleteReceiver= (data) => {
    return API.delete(`${Receiver}`, { params: { _id: data } });
  };

  export const getFilterReceiver= (data) => {
    return API.put(`${Receiver}/getFilterSenderInvoice`, data);
  };






