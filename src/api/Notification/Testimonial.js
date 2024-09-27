import API from "../api";
import {Testimonial} from '../endpoints'

export const saveTestimonial = (data) => {
    return API.post(`${Testimonial}`, data)
}


export const getallTestimonial = () => {
    return API.get(`${Testimonial}`)
}

export const activeClient = (data) => {
  return API.post(`${Testimonial}/active`,data);
};

export const deactivateClient = (data) => {
  return API.post(`${Testimonial}/deActive`,data);
};
export const getSingleLog = (data) => {
  return API.get(`${Testimonial}/getSingleLogged`, { params: { _id: data } });
};
export const getSingleTestimonial = (data) => {
    return API.get(`${Testimonial}/getSingleTestimonial`, { params: { _id: data } });
  };

export const updatedTestimonial = (data) => {
    return API.put(`${Testimonial}`, data);
  };

  export const getFilterTestimonial = (data) => {
    return API.put(`${Testimonial}/getFilterTestimonial`, data);
  };


export const deleteTestimonial = (data) => {
    return API.delete(`${Testimonial}`, { params: { _id: data } });
  };