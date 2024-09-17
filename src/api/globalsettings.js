import API from "./api"
import { Country } from "./endpoints"

export const saveCountry = (data) => {
    return API.post(`${Country}`, data)
}
export const updateCountry = (data) => {
    return API.put(`${Country}`, data)
}
export const getSingleCountry = (data) => {
    return API.get(`${Country}/getSingleCountry`, { params: { _id: data } })
}
export const getallCountry = () => {
    return API.get(`${Country}/`)
}
export const deleteCountry = (data) => {
    return API.delete(`${Country}`, { params: { _id: data } });
  };

  export const getFilterCountry= (data) => {
    return API.put(`${Country}/getFilterCountry`, data);
  };


