import API from "./api"
import { Blog } from "./endpoints"

export const saveBlog = (data) => {
    return API.post(`${Blog}`, data)
}

export const getallBlog = () => {
    return API.get(`${Blog}/`)
}

export const getSingleBlog = (data) => {
    return API.get(`${Blog}/getSingleBlog`, { params: { _id: data } });
  };
  export const deleteBlog = (data) => {
    return API.delete(`${Blog}`, { params: { _id: data } });
  };
  export const updateBlog = (data) => {
    return API.put(`${Blog}`, data);
  };

  export const getFilterBlog = (data) => {
    return API.put(`${Blog}/getFilterBlog`, data);
  };