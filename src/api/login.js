import API from "./api"
import { Login } from "./endpoints"


export const loginUser = (data)=>{
    return API.post(`${Login}`,data)
}


