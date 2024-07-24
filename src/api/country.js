import API from "./api"
import {Demo} from "./endpoints"

export const saveCountryList = (data) => {
    return API.post(`${Demo}`, data)
}
export const updateCountryList = (data) => {
    return API.put(`${Demo}`, data, {params: { _id: data._id }},)
}
export const getSingleCountryList = (data) => {
    return API.get(`${Demo}/getSingleDemo`, { params: { _id: data } })
}
export const getallCountryList = () => {
    return API.get(`${Demo}`)
}
export const deleteCountryList = (data) => {
    return API.delete(`${Demo}`, { params: { _id: data } });
  };

  export const getFilterCountryList = (data) => {
    return API.put(`${Demo}/getFilterDemo`, data);
  };

  export const getCountryByCountry= (country) => {
    return API.get(`${Demo}/getCountryByState`, {params: { country: country }, 
    });
};

export const getStatesByCountry= (country) => {
    return API.get(`${Demo}/getCountryByStates`, {params: { country: country }, 
    });
};

export const getCitiesByState= (state) => {
    return API.get(`${Demo}/getAllCities`, {params: { state:state }, 
    });
};