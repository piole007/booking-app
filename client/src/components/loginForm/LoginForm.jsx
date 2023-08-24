import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password
      });
    } catch (error) {
      alert('Registration failed. Please try again later')
    }
    

    alert('Registration successful. Now you can log in')
  }

  return (
    <div className="mb-64">
      <h1 className="text-4xl text-center mb-4">{title}</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>
        {/* Render the name input only if showNameInput is true */}
        {showNameInput && (
          <input
            className="name"
            type="text"
            placeholder="Name Surname"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        )}

        <input
          className="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />

        <input
          className="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

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
