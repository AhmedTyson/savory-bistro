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

/* --- NEW FORMS VALIDATION UTILITIES --- */

const PASSWORD_RULES_CONFIG = [
  { key: 'minLength', label: 'at least 8 characters',  test: (pw) => pw.length >= 8 },
  { key: 'uppercase', label: 'an uppercase letter',   test: (pw) => /[A-Z]/.test(pw) },
  { key: 'lowercase', label: 'a lowercase letter',   test: (pw) => /[a-z]/.test(pw) },
  { key: 'number',    label: 'a number',             test: (pw) => /[0-9]/.test(pw) },
  { key: 'special',   label: 'a special character',  test: (pw) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw) }
];

/**
 * Returns an object with boolean values for each password rule.
 */
export const getPasswordRules = (password) => {
  const rules = {};
  PASSWORD_RULES_CONFIG.forEach(rule => {
    rules[rule.key] = rule.test(password);
  });
  return rules;
};

/**
 * Returns a score from 0 to 5 based on satisfied password rules.
 */
export const getPasswordStrengthScore = (password) => {
  const rules = getPasswordRules(password);
  return Object.values(rules).filter(Boolean).length;
};

/**
 * Validates password strength and returns an error string or null.
 */
export const validatePasswordStrength = (password) => {
  if (!password || !password.trim()) {
    return 'Please choose a password.';
  }

  const rules = getPasswordRules(password);
  const failingRules = PASSWORD_RULES_CONFIG.filter(rule => !rules[rule.key]);

  if (failingRules.length === 0) return null;

  const labels = failingRules.map(r => r.label);
  return `Password must contain: ${labels.join(', ')}.`;
};

/**
 * Validates that two passwords match.
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword || !confirmPassword.trim()) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
};

/**
 * Validates that a field is not empty.
 */
export const validateRequired = (value, label = 'Field') => {
  if (!value || !value.trim()) {
    return `${label} is required.`;
  }
  return null;
};

/**
 * Validates email with specific error messages.
 */
export const validateEmail = (email, label = 'Email address') => {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return `${label} is required.`;
  }
  if (trimmed.length > 254) {
    return `${label} is too long (max 254 characters).`;
  }
  if (!isValidEmail(trimmed)) {
    return `Please enter a valid ${label.toLowerCase()}.`;
  }
  return null;
};

/**
 * Validates phone format.
 */
export const validatePhone = (phone, label = 'Phone number') => {
  const trimmed = (phone || '').trim();
  if (!trimmed) {
    return `${label} is required.`;
  }
  if (!isValidPhone(trimmed)) {
    return `Invalid ${label.toLowerCase()}.`;
  }
  return null;
};

/**
 * Validates minimum length requirement.
 */
export const validateMinLength = (value, min, label = 'Field') => {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return `${label} is required.`;
  }
  if (trimmed.length < min) {
    return `${label} must be at least ${min} characters.`;
  }
  return null;
};
