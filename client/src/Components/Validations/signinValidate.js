export const validateSignin = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "username is required";
    }

    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length < 5) {
      errors.password = "password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "password cannot exceed more than 10 characters";
    }
    return errors;
  };