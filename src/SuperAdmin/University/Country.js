// import CryptoJS from "crypto-js";

// export const saveToken = (data) => {
//   localStorage.setItem("token", data?.token);
//   localStorage.setItem("loginType", data?.loginType);
 
//   if (data?.userId) {
//     localStorage.setItem(
//       "userId",
//       CryptoJS.AES.encrypt(data?.userId, "sexify").toString()
//     );
//   } else if (data?.doctorId) {
//     localStorage.setItem(
//       "doctorId",
//       CryptoJS.AES.encrypt(data?.doctorId, "sexify").toString()
//     );
//   } else {
//     localStorage.setItem(
//       "adminId",
//       CryptoJS.AES.encrypt(data?.adminId, "sexify").toString()
//     );
//   }
// };
//  export const saveOrderId = (data) => {
//    localStorage.setItem("orderId", data?.orderId);
//  }
//  export const getOrderId = () => {
//   return localStorage.getItem("orderId");
//  }
// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const getLoginType = () => {
//   return localStorage.getItem("loginType");
// };

// export const getProductId = () => {
//   return localStorage.getItem("userId");
// };

// export const getUserId = () => {
//   const userId = localStorage.getItem("userId");
//   if (userId) {
//     try {
//       return CryptoJS.AES.decrypt(userId, "sexify").toString(CryptoJS.enc.Utf8);
//     } catch (error) {
//       console.error("Error decrypting userId:", error);
//       return null;
//     }
//   }
//   return null;
// };

// export const getDoctorId = () => {
//   const doctorId = localStorage.getItem("doctorId");
//   if (doctorId) {
//     try {
//       return CryptoJS.AES.decrypt(doctorId, "sexify").toString(
//         CryptoJS.enc.Utf8
//       );
//     } catch (error) {
//       console.error("Error decrypting doctorId:", error);
//       return null;
//     }
//   }
//   return null;
// };

// export const clearStorage = () => {
//   localStorage.clear();
// };
