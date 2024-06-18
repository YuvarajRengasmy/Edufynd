import API from "./api"
import { AllModule } from "./endpoints"

export const saveModule = (data) => {
    return API.post(`${AllModule}`, data)
}

export const updateModule= (data) => {
    return API.put(`${AllModule}`, data)
}


export const getSingleAllModule = (data) => {
    return API.get(`${AllModule}/getSingleCourseType`, { params: { _id: data } })
}
export const getallModule = () => {
    return API.get(`${AllModule}`)
}
export const deleteModule= (data) => {
    return API.delete(`${AllModule}`, { params: { _id: data } });
  };

  export const getFilterModule= (data) => {
    return API.put(`${AllModule}/getFilterCourseType`, data);
  };






