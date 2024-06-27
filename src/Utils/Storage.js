import CryptoJS from "crypto-js";


export const saveToken = (data) => {
  localStorage.setItem("token", data?.token);
  localStorage.setItem('loginType', CryptoJS.AES.encrypt((data?.loginType), 'edufynd').toString())
  if (data?.loginType === 'student') {
    localStorage.setItem('studentId', CryptoJS.AES.encrypt((data?.studentId), 'edufynd').toString())
  }
  if (data?.loginType === 'superAdmin') {
    localStorage.setItem('superAdminId', CryptoJS.AES.encrypt((data?.superAdminId), 'edufynd').toString())
  }
  if (data?.loginType === 'agent') {
    localStorage.setItem('agentId', CryptoJS.AES.encrypt((data?.agentId), 'edufynd').toString())
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getStudentId = () => {
  const studentId = localStorage.getItem('studentId')
  return CryptoJS.AES.decrypt(studentId, 'edufynd').toString(CryptoJS.enc.Utf8)
};

export const getSuperAdminId = () => {
  const superAdminId = localStorage.getItem('superAdminId')
  return CryptoJS.AES.decrypt(superAdminId, 'edufynd').toString(CryptoJS.enc.Utf8)
};

export const getAgentId = () => {
  const agentId = localStorage.getItem('agentId')
  return CryptoJS.AES.decrypt(agentId, 'edufynd').toString(CryptoJS.enc.Utf8)
};

export const getLoginType = () => {
  const loginType = localStorage.getItem('loginType')
  return CryptoJS.AES.decrypt(loginType, 'edufynd').toString(CryptoJS.enc.Utf8)
};

export const clearStorage = () => {
  localStorage.clear()
};
