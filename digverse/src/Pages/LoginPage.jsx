import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import "./LoginPage.css";
import Login from "../Components/Profile/Login";
import Register from "../Components/Profile/Register";

const ProfilePage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    setShowLogin(!showRegister);
  }, [showRegister]);

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
  };

  return (
    <>
      <Nav />
      <div className="login_container">
        <div className="left_section" style={{display:'flex', flexDirection:"column", gap:"50px"}}>
          <h1>Log in Your Account</h1>
          <i className="fa-solid fa-user fa-5x"></i>
        </div>
        <div className="login_container_supabase">
          <Login/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
