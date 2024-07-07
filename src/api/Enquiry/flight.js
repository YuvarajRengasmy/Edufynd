import API from "../api"
import { Flight } from "../endpoints"

export const saveLoanEnquiry = (data) => {
    return API.post(`${Flight}`, data)
}

export const updateLoanEnquiry= (data) => {
    return API.put(`${Flight}`, data)
}



export const getSingleLoanEnquiry = (data) => {
    return API.get(`${Flight}/getSingleLoanEnquiry`, { params: { _id: data } })
}
export const getallLoanEnquiry = () => {
    return API.get(`${Flight}`)
}
export const deleteLoanEnquiry= (data) => {
    return API.delete(`${Flight}`, { params: { _id: data } });
  };

  export const getFilterLoanEnquiry= (data) => {
    return API.put(`${Loan}/getFilterLoanEnquiry`, data);
  };






