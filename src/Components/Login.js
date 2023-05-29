import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("users/")
      .then((res) => {
        const userEmail = res.data.find((user) => user.Email === email);
        if (!userEmail) {
          toast.error("Please enter valid email address");
        } else {
          if (userEmail.Password === password) {
            toast.success("Login successfull");
            navigate("/");
            sessionStorage.setItem("email", userEmail.Email);
            setEmail("");
            setPassword("");
          } else {
            toast.error("please enter valid credentials");
            sessionStorage.removeItem("email");
          }
        }
      })
      .catch((err) => toast.error("Login failed due to:" + err.message));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="First Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="First Name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-block w-10 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
