export const validateSignup = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
        errors.fname = "first name is required";
      }

      if (!values.lname) {
        errors.lname = "last name is required";
      }
      
    if (!values.username) {
      errors.username = "username is required";
    }

    if (!values.email) {
      errors.email = "email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "enter a valid email";
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