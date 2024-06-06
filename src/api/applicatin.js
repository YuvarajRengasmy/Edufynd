import API from "./api"
import { Application} from "./endpoints"

export const saveApplication = (data) => {
    return API.post(`${Application}`, data)
}
