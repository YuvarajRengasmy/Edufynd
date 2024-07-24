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
    return API.get(`${CountryList}`)
}
export const deleteCountryList = (data) => {
    return API.delete(`${CountryList}`, { params: { _id: data } });
  };

  export const getFilterCountryList = (data) => {
    return API.put(`${CountryList}/getFilterCountryList`, data);
  };

  export const getCountryByCountry= (country) => {
    return API.get(`${CountryList}/getCountryByState`, {params: { country: country }, 
    });
};

export const getStatesByCountry= (country) => {
    return API.get(`${CountryList}/getCountryByStates`, {params: { country: country }, 
    });
};

export const getCitiesByState= (state) => {
    return API.get(`${CountryList}/getAllCities`, {params: { state:state }, 
    });
};