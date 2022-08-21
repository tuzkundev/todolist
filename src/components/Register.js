import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
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

  const addData = async (e) => {
    e.preventDefault();

    const { name, email, password, age } = user;

    let results = await axios
      .post("https://api-nodejs-todolist.herokuapp.com/user/register", {
        name: name,
        email: email,
        password: password,
        age: age,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });

    navigate("/login");
    localStorage.setItem("userInfo", JSON.stringify([...data, results]));
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={addData}>
        <div className="form-control">
          <input
            type="text"
            id="name"
            placeholder="Username"
            onChange={getData}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={getData}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={getData}
          />
          <span></span>
        </div>
        <div className="form-control">
          <input type="number" id="age" placeholder="Age" onChange={getData} />
          <span></span>
        </div>

        <input type="submit" value="Register" />
        <div className="signup">
          Not a new member?{" "}
          <button>
            <NavLink to="/login">Sign up</NavLink>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
