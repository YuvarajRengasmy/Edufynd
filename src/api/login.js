import API from "./api"
import { Login } from "./endpoints"


export const loginUser = (data)=>{
    return API.post(`${Login}`,data)
}

export const forgotPassword = (data) => {
    return API.put(`${Login}/forgotPassword`, data);
  };


  export const resetPassword = (data) => {
    return API.put(`${Login}/resetPassword`, data);
  };

