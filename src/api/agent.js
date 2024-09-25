import API from "./api"
import { Agent } from "./endpoints"

export const saveAgent = (data) => {
    return API.post(`${Agent}`, data)
}
export const saveAgents = (data) => {
  return API.post(`${Agent}/register`, data)
}
export const saveContact = (data) => {
    return API.post(`${Agent}/contact`, data);
  };

  export const updateAgent = (data) => {
    return API.put(`${Agent}`, data)
}

export const activeClient = (data) => {
  return API.post(`${Agent}/activeAgent`,data);
};
export const assignStaffToEnquiries = (data) => {
  return API.post(`${Agent}/assign`,data);
};
export const deactivateClient = (data) => {
  return API.post(`${Agent}/deActiveAgent`,data);
};
export const getSingleAgent = (data) => {
    return API.get(`${Agent}/getsingleagent`, { params: { _id: data } })
}
export const getSingleAgentLog = (data) => {
  return API.get(`${Agent}/SingleLog`, { params: { _id: data } })
}

export const getallAgent = () => {
    return API.get(`${Agent}`)
}

export const getallAgentLog = () => {
  return API.get(`${Agent}/logs`)
}
export const getFilterAgent = (data) => {
  return API.put(`${Agent}/getFilterStudentByAgent`, data);
};
export const deleteAgent = (data) => {
    return API.delete(`${Agent}`, { params: { _id: data } });
  };

  export const SuperAgent = (data) => {
    return API.post(`${Agent}/createAgentBySuperAdmin`, data)
}
export const EditAgentSuper = (data) => {
  return API.put(`${Agent}/createStudentBySuperAdmin`, data)
}


