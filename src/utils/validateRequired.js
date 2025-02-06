export const validateName = (value) => {
  if (!value || value.trim() === "") return "Name is required";

  const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
  return !nameRegex.test(value)
    ? "Name must contain only letters"
    : undefined;
};


export const validateEmail = (value) => {
  if (!value) return "Email is required";
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return !emailRegex.test(value) ? "Invalid email address" : undefined;
};

export const validateMobile = (value) => {
  if (!value) return "Mobile number is required";
  const phoneRegex = /^\d{10}$/;
  return !phoneRegex.test(value)
    ? "Invalid mobile number (must be 10 digits)"
    : undefined;
};


export const validateRequired = value => !value || value.trim() === '' ? 'This field is required' : undefined;