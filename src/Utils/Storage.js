import CryptoJS from "crypto-js";

export const saveToken = (data) => {
  localStorage.setItem("token", data?.token);
  localStorage.setItem("loginType", data?.loginType);
  if (data?.panelId) {
    localStorage.setItem(
      "panelId",
      CryptoJS.AES.encrypt(data?.panelId, "pixaliveWebalive").toString()
    );
  } else if (data?.doctorId) {
    localStorage.setItem(
      "doctorId",
      CryptoJS.AES.encrypt(data?.doctorId, "pixaliveWebalive").toString()
    );
  } else if (data?.userId) {
    localStorage.setItem(
      "userId",
      CryptoJS.AES.encrypt(data?.userId, "pixaliveWebalive").toString()
    );
  } else {
    localStorage.setItem(
      "companyId",
      CryptoJS.AES.encrypt(data?.companyId, "pixaliveWebalive").toString()
    );
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getLoginType = () => {
  return localStorage.getItem("loginType");
};

export const getUserId = () => {
  const panelId = localStorage.getItem("panelId");
  if (panelId) {
    return CryptoJS.AES.decrypt(panelId, "pixaliveWebalive").toString(
      CryptoJS.enc.Utf8
    );
  } else {
    return null;
  }
};

export const getDoctorId = () => {
  const doctorId = localStorage.getItem("doctorId");
  if (doctorId) {
    return CryptoJS.AES.decrypt(doctorId, "pixaliveWebalive").toString(
      CryptoJS.enc.Utf8
    );
  } else {
    return null;
  }
};

// export const getPanelId = () => {
//   const userId = localStorage.getItem('userId');
//     if (userId) {
//       return CryptoJS.AES.decrypt(userId, 'pixaliveWebalive').toString(CryptoJS.enc.Utf8);
//     } else {
//       return null;
//     }
// };

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
