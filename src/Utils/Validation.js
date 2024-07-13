// export function isValidEmail(email) {
//   return /\S+@\S+\.\S+/.test(email);
// }

export function isValidPassword(pass) {
  return /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/.test(pass);
}

// export function isValidPhone(phone) {
//   return /^[789]\d{9,9}$/.test(phone);
// }

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

export const isValidWebsite = (website) => {
  const websiteRegex = /^(https?:\/\/)?([^\s@]+@[^\s@]+\.)?([^\s@]+\.)?([^\s@]+\.[^\s@]{2,})(\/[^\s@]*)*$/;
  return websiteRegex.test(website);
}
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}