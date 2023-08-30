import { useContext, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "./validators/Validators";
import { useEffect } from "react";

const LoginForm = ({
  questionText,
  btnText,
  routText,
  rout,
  title,
  showNameInput,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [formIsValid, setFrormIsValid] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const nameError = nameValidator(name);
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    setNameError(nameError);
    setEmailError(emailError);
    setPasswordError(passwordError);

    setFrormIsValid(!nameError & !emailError & !passwordError);
  }, [email, name, password]);

  async function registerUser(ev) {
    ev.preventDefault();
    if (formIsValid) {
      try {
        await axios.post("/register", {
          name,
          email,
          password,
        });
      } catch (error) {
        alert("Registration failed. Please try again later");
      }
      alert("Registration successful. Now you can log in");
    }
  }

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  // const getOnSubmit = () => {
  //   showNameInput ? registerUser : null
  // };

  return (
    <div className="mb-64 w-screen">
      <h1 className="text-4xl text-center mb-4">{title}</h1>
      <form
        className="max-w-md mx-auto"
        onSubmit={showNameInput ? registerUser : loginUser}
      >
        {/* Render the name input only if showNameInput is true */}
        {showNameInput && (
          <>
            <input
              className="name invalid:border-red-500"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <div className="error">{nameError}</div>
          </>
        )}
        <input
          className="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        {showNameInput && <div className="error">{emailError}</div>}

        <input
          className="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {showNameInput && <div className="error">{passwordError}</div>}
        

        <button className="login">{btnText}</button>
        <div className="text-center py-2 text-gray-500">
          {questionText}{" "}
          <Link className="underline text-black" to={rout}>
            {routText}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
