import API from "../api"
import { LoanStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${LoanStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${LoanStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${LoanStatus}/getSingleLoanStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${LoanStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${LoanStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${LoanStatus}/getFilterLoanStatus`, data);
  };