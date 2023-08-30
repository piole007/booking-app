export const nameValidator = (name, setError) => {
  if (name.length <= 3 && name.length > 0) {
    setError(true);
    return "Your name should be longer";
  }
  return "";
};

export const emailValidator = (email, setError) => {
  if (!new RegExp(/\S+@\S+\.\S+/).test(email) && email.length > 0) {
    setError(true);
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = (password, setError) => {
  if (password.length < 8 && password.length > 0) {
    setError(true);
    return "Password musth have minimum 8 characters";
  }
  return "";
};
