import API from "./api"
import { Agent } from "./endpoints"

export const saveAgent = (data) => {
    return API.post(`${Agent}`, data)
}







