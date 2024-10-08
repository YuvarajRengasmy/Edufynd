import API from "./api"
import { Intake} from "./endpoints"

export const saveIntake = (data) => {
    return API.post(`${Intake}`, data)
}
export const updateIntake = (data) => {
    return API.put(`${Intake}`, data, {params: { _id: data._id }},)
}
export const getSingleIntake = (data) => {
    return API.get(`${Intake}/getSingleInTake`, { params: { _id: data } })
}
export const getallIntake = () => {
    return API.get(`${Intake}`)
}
export const deleteIntake = (data) => {
    return API.delete(`${Intake}`, { params: { _id: data } });
  };

  export const getFilterIntake = (data) => {
    return API.put(`${Intake}/getFilterInTake`, data);
  };