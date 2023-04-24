import React from "react";

import Nav from "../Components/Nav/Nav";
import "./LoginPage.css";
import Login from "../Components/Profile/Login";
import rocket from "../Components/assets/rocket.png";
import moon from "../Components/assets/moon.png";

const ProfilePage = () => {

  return (
    <>
      <Nav />
      <div className="login_container">
        <div
          className="left_section"
          style={{ display: "flex", flexDirection: "column", gap: "50px" }}
        >
          <img src={moon} alt="" id="moon" srcset="" />
          <img src={rocket} alt="" id="rocket" srcset="" />
        </div>
        <div className="login_container_supabase animate__animated animate__fadeInUp">
          <h1>Log in or Register</h1>
          <Login />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
