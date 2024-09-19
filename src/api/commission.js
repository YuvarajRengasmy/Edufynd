import API from "./api"
import {CommissionPage, University} from "./endpoints"

export const saveCommission = (data) => {
    return API.post(`${CommissionPage}`, data)
}

export const getallCommission = () => {
    return API.get(`${CommissionPage}`)
}
export const getFilterCommission = (data) => {
  return API.put(`${CommissionPage}/getFilterCommission`, data);
};

export const getSingleCommission = (data) => {
    return API.get(`${CommissionPage}/getSingleCommission`, { params: { _id: data } });
  };
  export const deleteCommission = (data) => {
    return API.delete(`${CommissionPage}`, { params: { _id: data } });
  };
 

  export const  getSingleUniversityCommission = (data) => {
    return API.get(`${CommissionPage}/getSingleUniversity`, { params: {universityId: data } });
  };

  export const updatedCommission = (data) => {
    return API.put(`${CommissionPage}`, data);
  };
