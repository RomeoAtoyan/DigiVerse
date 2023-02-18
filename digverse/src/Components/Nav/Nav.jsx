import React, { useEffect, useState } from "react";
import "./Nav.css";
import digiLogo from "../assets/D-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
// you can add a useEffect and in there get the localStorage user

//dont forget you have to convert string to object => JSON.parse

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [toggleMenu, setToggleMenu] = useState(false);

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

  const hamburgerMenuToggle = () => {
    setToggleMenu(!toggleMenu);
    // const menuIcon = document.querySelector(".hamburger_menu i");
    // menuIcon.classList.toggle("fa-bars");
    // menuIcon.classList.toggle("fa-times");
  };

  return (
    <nav className="navbar_container">
      <div className="navbar_items">
        <div className="hamburger_menu">
          <i
            onClick={hamburgerMenuToggle}
            className={`fa-solid ${toggleMenu ? "fa-times" : "fa-bars"} fa-2x`}
          ></i>
          {toggleMenu ? (
            <div className="hamburger_menu_items">
              <ul>
                <li>
                  <NavLink to="/cryptocurrencies">Crypto</NavLink>
                </li>
                <li>
                  <NavLink to="/news">News</NavLink>
                </li>
                {Object.keys(user).length !== 0 ? (
                  <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="title_section">
          <img onClick={() => navigate("/cryptocurrencies")} id="digiverse-logo" src={digiLogo} alt="" />
          <h1 onClick={() => navigate("/cryptocurrencies")} id="Digi">
            Digi<span id="Verse">Verse</span>
          </h1>
        </div>
        <div
          className={`navbar_redirections ${
            user ? "navbar_redirect_horizontal navbar_redirect_vertical" : ""
          }`}
        >
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
