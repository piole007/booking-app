export const nameValidator = (name) => {
  if (!name) {
    return ("Name is required");
  } else if (name.length <= 3) {
    return "Your name should be longer";
  }
  return "";
};

export const emailValidator = (email) => {
  if (!email) {
    return ("Email is required");
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return ("Incorrect email format");
  }
  return "";
};

export const passwordValidator = (password) => {
  if (!password) {
    return ("Password is required");
  } else if (password.length < 8) {
    return ("Password musth have minimum 8 characters");
  }
  return "";
};
