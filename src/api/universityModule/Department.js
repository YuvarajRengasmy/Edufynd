import API from "../api"
import { DepartmentHead } from "../endpoints"


export const getallDepartment = () => {
    return API.get(`${DepartmentHead}`)
}