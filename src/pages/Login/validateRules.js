export default function validateLogin(name, values) {
  const errors = {};

  const validateEmail = () => {
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
  };

  const validatePassword = () => {
    if (!values.password) {
      errors.password = "Password is required";
    }
  };

  const validateMobile = () => {
    if (!values.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^[+]?[0-9]{7,15}$/.test(values.mobile.replace(/\s/g, ""))) {
      errors.mobile = "Please enter a valid mobile number";
    }
  };

  switch (name) {
    case "email":
      validateEmail();
      break;
    case "password":
      validatePassword();
      break;
    case "mobile":
      validateMobile();
      break;
    default:
      if (values.email !== undefined) validateEmail();
      if (values.password !== undefined) validatePassword();
      if (values.mobile !== undefined) validateMobile();
      break;
  }

  return errors;
}