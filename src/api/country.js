import API from "./api"
import {CountryList} from "./endpoints"

export const saveCountryList = (data) => {
    return API.post(`${CountryList}`, data)
}
export const updateCountryList = (data) => {
    return API.put(`${CountryList}`, data, {params: { _id: data._id }},)
}
export const getSingleCountryList = (data) => {
    return API.get(`${CountryList}/getSingleCountryList`, { params: { _id: data } })
}
export const getallCountryList = () => {
    return API.get(`${CountryList}/`)
}
export const deleteCountryList = (data) => {
    return API.delete(`${CountryList}`, { params: { _id: data } });
  };

  export const getFilterCountryList = (data) => {
    return API.put(`${CountryList}/getFilterCountryList`, data);
  };


