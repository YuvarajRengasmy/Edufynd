import API from "../api"
import { PaymentGetWay } from "../endpoints"

export const savePaymentGetWay = (data) => {
    return API.post(`${PaymentGetWay}`, data)
}

export const updatePaymentGetWay= (data) => {
    return API.put(`${PaymentGetWay}`, data)
}

export const getSinglePaymentGetWay = (data) => {
    return API.get(`${PaymentGetWay}/getSinglePaymentGetWay`, { params: { _id: data } })
}
export const getallPaymentGetWay = () => {
    return API.get(`${PaymentGetWay}`)
}
export const deletePaymentGetWay= (data) => {
    return API.delete(`${PaymentGetWay}`, { params: { _id: data } });
  };







