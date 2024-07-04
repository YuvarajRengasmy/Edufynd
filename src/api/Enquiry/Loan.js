import API from "../api"
import { Loan } from "../endpoints"

export const saveLoanEnquiry = (data) => {
    return API.post(`${Loan}`, data)
}

export const updateLoanEnquiry= (data) => {
    return API.put(`${Loan}`, data)
}



export const getSingleLoanEnquiry = (data) => {
    return API.get(`${Loan}/getSingleLoanEnquiry`, { params: { _id: data } })
}
export const getallLoanEnquiry = () => {
    return API.get(`${Loan}`)
}
export const deleteLoanEnquiry= (data) => {
    return API.delete(`${Loan}`, { params: { _id: data } });
  };

  export const getFilterLoanEnquiry= (data) => {
    return API.put(`${Loan}/getFilterLoanEnquiry`, data);
  };






