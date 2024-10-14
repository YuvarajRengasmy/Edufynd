import API from "../api"
import { StudentStatus} from "../endpoints"

export const saveStatus = (data) => {
    return API.post(`${StudentStatus}`, data)
}
export const updateStatus = (data) => {
    return API.put(`${StudentStatus}`, data, {params: { _id: data._id }}, )
}

export const getSingleStatus = (data) => {
    return API.get(`${StudentStatus}/getSingleStudentStatus`, { params: { _id: data } })
}
export const getallStatuses = () => {
    return API.get(`${StudentStatus}`)
}
export const deleteStatus = (data) => {
    return API.delete(`${StudentStatus}`, { params: { _id: data } });
  };

  export const getFilterApplicationStatus= (data) => {
    return API.put(`${StudentStatus}/getFilterStudentStatus`, data);
  };