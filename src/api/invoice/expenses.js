import API from "../api"
import { Expense } from "../endpoints"

export const saveExpense = (data) => {
    return API.post(`${Expense}`, data)
}

export const updateExpense= (data) => {
    return API.put(`${Expense}`, data)
}

export const getSingleExpense = (data) => {
    return API.get(`${Expense}/getSingleExpense`, { params: { _id: data } })
}
export const getallExpense = () => {
    return API.get(`${Expense}`)
}
export const deleteExpense= (data) => {
    return API.delete(`${Expense}`, { params: { _id: data } });
  };

  export const getFilterExpense= (data) => {
    return API.put(`${Expense}/getFilterExpense`, data);
  };
  export const activeExpense = (data) => {
    return API.post(`${Expense}/active`,data);
  };

  export const deactivateExpense = (data) => {
    return API.post(`${Expense}/deActive`,data);
  };

  export const getAllExpenseCard = () => {
    return API.get(`${Expense}/card`)
  }




