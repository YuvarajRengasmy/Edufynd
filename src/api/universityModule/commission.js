import API from "../api"
import { Commission } from "../endpoints"

export const saveCommission = (data) => {
    return API.post(`${Commission}`, data)
}

export const updateCommission= (data) => {
    return API.put(`${Commission}`, data)
}


export const getSingleAllCommission = (data) => {
    return API.get(`${Commission}/getSingleCommissionPaid`, { params: { _id: data } })
}
export const getallCommission = () => {
    return API.get(`${Commission}`)
}
export const deleteCommission= (data) => {
    return API.delete(`${Commission}`, { params: { _id: data } });
  };

  export const getFilterCommission= (data) => {
    return API.put(`${Commission}/getFilterCommissionPaid`, data);
  };






