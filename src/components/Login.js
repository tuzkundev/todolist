import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",

    password: "",
  });
  const [data, setData] = useState([]);

  const getData = (e) => {
    const { value, name } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const getUserArr = localStorage.getItem("userInfo");
    const { email, password } = user;

    //https://api-nodejs-todolist.herokuapp.com/user/login

    if (getUserArr && getUserArr.length) {
      const userData = JSON.parse(getUserArr);
      const userLogin = userData.filter((el, k) => {
        return el.email === email && el.password === password;
      });

      if (userLogin.length === 0) {
        alert("Loi chua nhap");
      } else {
        console.log("Login ok");

        localStorage.setItem("user_login", JSON.stringify(userLogin));

        navigate("/todo");
      }
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
            onChange={getData}
          />
          <span></span>
        </div>
        <div className="form-control-login">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={getData}
          />
          <span></span>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
