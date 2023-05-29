import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("email") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        {isLoggedIn && location.pathname === "/" && (
          <>
            <NavLink className="navbar-brand" to={"/"}>
              Home
            </NavLink>
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {isLoggedIn && location.pathname !== "/" && (
          <>
            <NavLink className="nav-link" to={"/"}>
              Home
            </NavLink>
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && location.pathname !== "/login" && (
          <NavLink className="nav-link" to={"/login"}>
            Login
          </NavLink>
        )}
        {!isLoggedIn && location.pathname !== "/register" && (
          <NavLink className="nav-link" to={"/register"}>
            Signup
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;
