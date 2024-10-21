import API from "../api"
import { Loan } from "../endpoints"

export const saveLoanEnquiry = (data) => {
    return API.post(`${Loan}`, data)
}

export const updateLoanEnquiry= (data) => {
    return API.put(`${Loan}`, data)
}
export const activeClient = (data) => {
  return API.post(`${Loan}/active`,data);
};
export const statusApplication = (data) => {
  return API.put(`${Loan}/status`, data);
};
export const deactivateClient = (data) => {
  return API.post(`${Loan}/deActive`,data);
};
export const assignStaffToEnquiries = (data) => {
  return API.post(`${Loan}/assign`,data);
};
export const getSingleLogUniversity = (data) => {
    return API.get(`${Loan}/SingleLog`, { params: { _id: data } });
  };

export const getSingleLoanEnquiry = (data) => {
    return API.get(`${Loan}/getSingleLoanEnquiry`, { params: { _id: data } })
}
export const getallLoanEnquiry = () => {
    return API.get(`${Loan}`)
}


export const getAllLoanEnquiryCard = () => {
  return API.get(`${Loan}/card`)
}
export const deleteLoanEnquiry= (data) => {
    return API.delete(`${Loan}`, { params: { _id: data } });
  };

  export const getFilterLoanEnquiry= (data) => {
    return API.put(`${Loan}/getFilterLoanEnquiry`, data);
  };






