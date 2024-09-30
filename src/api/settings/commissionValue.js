import API from "../api"
import { CommissionType} from "../endpoints"

export const saveIntake = (data) => {
    return API.post(`${CommissionType}`, data)
}
export const updateIntake = (data) => {
    return API.put(`${CommissionType}`, data, {params: { _id: data._id }},)
}
export const getSingleIntake = (data) => {
    return API.get(`${CommissionType}/getSingleCommissionType`, { params: { _id: data } })
}
export const getallIntakes = () => {
    return API.get(`${CommissionType}`)
}
export const deleteIntake = (data) => {
    return API.delete(`${CommissionType}`, { params: { _id: data } });
  };

  export const getFilterIntake = (data) => {
    return API.put(`${CommissionType}/getFilterCommissionType`, data);
  };