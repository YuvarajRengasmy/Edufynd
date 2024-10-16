import API from "../api"
import { Income } from "../endpoints"

export const saveIncome = (data) => {
    return API.post(`${Income}`, data)
}

export const updateIncome= (data) => {
    return API.put(`${Income}`, data)
}

export const getSingleIncome = (data) => {
    return API.get(`${Income}/getSingleIncome`, { params: { _id: data } })
}
export const getallIncome = () => {
    return API.get(`${Income}`)
}
export const deleteIncome= (data) => {
    return API.delete(`${Income}`, { params: { _id: data } });
  };

  export const getFilterIncome= (data) => {
    return API.put(`${Income}/getFilterIncome`, data);
  };
  export const activeIncome = (data) => {
    return API.post(`${Income}/active`,data);
  };

  export const deactivateIncome = (data) => {
    return API.post(`${Income}/deActive`,data);
  };

  export const getAllIncomeCard = () => {
    return API.get(`${Income}/card`)
  }




