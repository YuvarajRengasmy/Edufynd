import API from "./api"
import {University } from "./endpoints"

export const saveUniversity = (data) => {
    return API.post(`${University}`, data)
}

export const getallUniversity = () => {
    return API.get(`${University}`)
}
export const getLogsUniversity = () => {
  return API.get(`${University}/logs`)
}
export const getAllUniversit = () => {
  return API.get(`${University}/getAllUniversit`)
}
export const getUniversitiesByClients = () => {
  return API.get(`${University}/universities/:clientName`)
}
export const getFilterUniversity = (data) => {
  return API.put(`${University}/getFilterUniversity`,data );
};
export const getSingleUniversity = (data) => {
    return API.get(`${University}/getSingleUniversity`, { params: { _id: data } });
  };

  export const activeClient = (data) => {
    return API.post(`${University}/activeUniversity`,data);
  };

  export const deactivateClient = (data) => {
    return API.post(`${University}/deActiveUniversity`,data);
  };
  
  export const getSingleLogUniversity = (data) => {
    return API.get(`${University}/SingleLog`, { params: { _id: data } });
  };
  export const deleteUniversity = (data) => {
    return API.delete(`${University}`, { params: { _id: data } });
  };
  export const updateUniversity = (data) => {
    return API.put(`${University}`, data);
  };

  export const getAllUniversityForWeb = (data) => {
    return API.get(`${University}/getAllUniversityForweb`, data);
  };

  export const UniversityProgram = (data) => {
    return API.get(`${University}/getProgramByUniversity`, { params: { universityId: data } });
  };

  export const getUniversitiesByCountry = (country) => {
    return API.get(`${University}/getUniversityByCountry`, {
        params: { country: country }, 
    });
};

export const getUniversitiesByProgram = (universityName) => {
  return API.get(`${University}/getUniversityByName`, {
      params: { universityName: universityName }, 
  });
};

export const findUniversityByName = (name) => {
  return API.get(`${University}/getUniversityByCountry`, {
      params: { universityName: name }, 
  });
};
