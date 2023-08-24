import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
