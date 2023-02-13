import React, { useEffect, useState } from "react";
import "./Nav.css";
import digiLogo from "../assets/D-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
// you can add a useEffect and in there get the localStorage user

//dont forget you have to convert string to object => JSON.parse

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  // useEffect(() => {
  //   const localUser = localStorage.getItem("User_Status");
  //   if (localUser) {
  //     setUser(JSON.parse(localUser));
  //   }
  // }, []);

  // useEffect(() => {
  //   const localUser = localStorage.getItem("User_Status");
  //   if (localUser) {
  //     try {
  //       const parsedUser = JSON.parse(localUser);
  //       setUser(parsedUser);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const localUser = localStorage.getItem("User_Status");
    if (localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        setUser(parsedUser);
      } catch (error) {
        if (localUser === "SIGNED_IN") {
          navigate("/");
          console.table(localUser);
        } else {
          console.error(error);
        }
      }
    }
  }, []);

  return (
    <nav className="navbar_container">
      <div className="navbar_items">
        <div className="title_section">
          <img id="digiverse-logo" src={digiLogo} alt="" />
          <h1 id="Digi">
            Digi<span id="Verse">Verse</span>
          </h1>
        </div>
        <div className="navbar_redirections">
          <ul>
            {/* <li>
              <NavLink to="/">Home</NavLink>
              <i className="fa-solid fa-house"></i>
            </li> */}
            <li>
              <NavLink to="/cryptocurrencies">Crypto</NavLink>
              <i className="fa-solid fa-coins"></i>
            </li>
            <li>
              <NavLink to="/news">News</NavLink>
              <i className="fa-solid fa-newspaper"></i>
            </li>
            {Object.keys(user).length !== 0 ? (
              <li>
                <NavLink to="/favorites">Favorites</NavLink>
                <i className="fa-regular fa-bookmark"></i>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="navbar_right_items">
          {Object.keys(user).length !== 0 ? (
            <NavLink to="/profile">
              <div className="profile_picture">
                <span>{user.email[0].toUpperCase()}</span>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
