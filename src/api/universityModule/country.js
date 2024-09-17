import API from "../api"
import { CountryModule } from "../endpoints"

export const saveCountryModule = (data) => {
    return API.post(`${CountryModule}`, data)
}

export const updateCountryModule= (data) => {
    return API.put(`${CountryModule}`, data)
}


export const getSingleAllCountryModule = (data) => {
    return API.get(`${CountryModule}/getSingleCountry`, { params: { _id: data } })
}
export const getallCountryModule = () => {
    return API.get(`${CountryModule}`)
}
export const deleteCountryModule= (data) => {
    return API.delete(`${CountryModule}`, { params: { _id: data } });
  };

  export const getFilterCountryModule= (data) => {
    return API.put(`${CountryModule}/getFilterCountry`, data);
  };






