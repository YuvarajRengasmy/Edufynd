export const isValidBankAccountNumber = (accountNumber) => {
 
  const regex = /^\d{9,18}$/;
  return regex.test(accountNumber);
};

export function isValidPassword(pass) {
  return /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/.test(pass);
}
export const isValidPAN = (pan) => {
  const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};



export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidPhone = (phone) => {
  // const phoneRegex = /^[0-9]{15}$/;
  const phoneRegex = /^[5-9]\d{9,14}$/;
  return phoneRegex.test(phone);
}

export const isValidPhones = (phone) => {
  // Regex explanation:
  // ^                - Start of the string
  // [5-9]           - First digit must be between 5 and 9
  // \d{9,14}        - Followed by 9 to 14 more digits (total 10 to 15 digits)
  // $                - End of the string
  const phoneRegex = /^[5-9]\d{9,14}$/;
  return phoneRegex.test(phone);
};

export const isValidWebsite = (website) => {
  const websiteRegex = /^(https?:\/\/)?([^\s@]+@[^\s@]+\.)?([^\s@]+\.)?([^\s@]+\.[^\s@]{2,})(\/[^\s@]*)*$/;
  return websiteRegex.test(website);
}
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}
export const isValidNumberLessThanOrEqualTo35 = (number) => {
  return !isNaN(number) && Number(number) <= 35;
};
export const isValidNumberLessThanOrEqualTo99 = (number) => {
  return !isNaN(number) && Number(number) <= 99;
};
export const  isValidPinCode= (number) => {
  return typeof number === 'string' && /^\d{1,6}$/.test(number);
};
export const isValidYear = (year) => {
  return typeof year === 'string' && /^\d{4}$/.test(year);
};
export const isValidNumber = (number) => {
  return typeof number === 'string' && /^\d{1,3}$/.test(number);
};
export const isValidNo = (number) => {
  return typeof number === 'string' && /^\d{1,2}$/.test(number);
};

export const isValidDuration = (duration) => {
  return duration === '1year' || duration === '2year';
};

export const isValidDob = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (age > 17) {
    return true;
  } else if (age === 17) {
    if (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)) {
      return true;
    }
  }
  return false;
};


export const isValidCourseFees = (courseFees) => {
  return /^\d{4}$/.test(courseFees);
};

export const isValidPassportNumber = (passportNumber) => {
  const passportRegex = /^[A-Z0-9]{5,17}$/;
  return passportRegex.test(passportNumber);
};

export const isValidGSTN = (gstn) => {
  const gstnRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
  return gstnRegex.test(gstn);
};
