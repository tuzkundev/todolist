import React, { useState, useEffect } from "react";
import { login } from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // const getTokenRegister = localStorage.getItem("token");
    // if (getTokenRegister) {
    //   navigate("/todo");
    // } else {
    //   navigate("/");
    // }

    function loginStore() {
      const getTokenRegister = localStorage.getItem("token");
      if (getTokenRegister) {
        navigate("/todo");
      } else {
        navigate("/");
      }
    }

    window.addEventListener("storage", loginStore);

    return () => {
      window.removeEventListener("storage", loginStore);
    };
  }, []);

  const addData = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Chua nhap email hoac password");
    } else {
      axios
        .post("https://api-nodejs-todolist.herokuapp.com/user/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
        })
        .then(() => setTimeout(() => navigate("/todo"), 3000));
    }
  };

  return (
    <div className="container-login">
      <h1>Login</h1>
      <form onSubmit={addData}>
        <div className="form-control-login">
          <input
            type="text"
            id="name"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span></span>
        </div>
        <div className="form-control-login">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
