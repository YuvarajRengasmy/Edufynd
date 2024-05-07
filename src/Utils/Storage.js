import CryptoJS from "crypto-js";

export const saveToken = (data) => {
  localStorage.setItem("token", data?.token);
  localStorage.setItem("loginType", data?.loginType);
  if (data?.studentId) {
    localStorage.setItem(
      "studentId",
      CryptoJS.AES.encrypt(data?.studentId, "edufynd").toString()
    );
  } else if (data?.agentId) {
    localStorage.setItem(
      "agentId",
      CryptoJS.AES.encrypt(data?.agentId, "edufynd").toString()
    );
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getLoginType = () => {
  return localStorage.getItem("loginType");
};

export const getStudentId = () => {
  const studentId = localStorage.getItem("studentId");
  if (studentId) {
    return CryptoJS.AES.decrypt(studentId, "afynd").toString(
      CryptoJS.enc.Utf8
    );
  } else {
    return null;
  }
};

export const getAgentId = () => {
  const agentId = localStorage.getItem("agentId");
  if (agentId) {
    return CryptoJS.AES.decrypt(agentId, "edufynd").toString(
      CryptoJS.enc.Utf8
    );
  } else {
    return null;
  }
};



export const getAdminId = () => {
  const companyId = localStorage.getItem("companyId");
  if (companyId) {
    return CryptoJS.AES.decrypt(companyId, "pixaliveWebalive").toString(
      CryptoJS.enc.Utf8
    );
  } else {
    return null;
  }
};

export const clearStorage = () => {
  localStorage.clear();
};
