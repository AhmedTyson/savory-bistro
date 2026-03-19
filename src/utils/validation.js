// rfc 5322 compliant email regex
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

// basic phone regex (digits, spaces, hyphens, plus, parentheses, min 7 chars)
export const PHONE_REGEX = /^[\d\s\-\+\(\)]{7,}$/;

export const isValidEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim());
};

export const isValidPhone = (phone) => {
  if (!phone) return false;
  return PHONE_REGEX.test(phone.trim());
};

export const isNotEmpty = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const hasMinLength = (value, min) => {
  return typeof value === 'string' && value.trim().length >= min;
};
