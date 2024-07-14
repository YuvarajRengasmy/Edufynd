

export function isValidPassword(pass) {
  return /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/.test(pass);
}



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
export const isValidNumberLessThanOrEqualTo35 = (number) => {
  // Check if the number is a valid number and 35 or less
  return !isNaN(number) && Number(number) <= 35;
};
export const  isValidPinCode= (number) => {
  // Check if number is a string and matches the regex for a number with up to 6 digits
  return typeof number === 'string' && /^\d{1,6}$/.test(number);
};
export const isValidYear = (year) => {
  // Check if year is a string and matches the regex for a four-digit number
  return typeof year === 'string' && /^\d{4}$/.test(year);
};
export const isValidNumber = (number) => {
  // Check if number is a string and matches the regex for a number with up to 3 digits
  return typeof number === 'string' && /^\d{1,3}$/.test(number);
};

export const isValidDuration = (duration) => {
  return duration === '1year' || duration === '2year';
};

export const isValidCourseFees = (courseFees) => {
  return /^\d{4}$/.test(courseFees);
};