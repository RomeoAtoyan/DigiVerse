import React, { useEffect, useState } from "react";
import "./Nav.css";
import digiLogo from "../assets/D-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../Profile/supabaseClient";

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [toggleMenu, setToggleMenu] = useState(false);

  const checkUser = async () => {
    const user = await supabase.auth.getSession();
    if (user) {
      setUser(user.data.session.user);
    } else {
      console.log("User is not logged in");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const hamburgerMenuToggle = () => {
    setToggleMenu(!toggleMenu);
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
          <img
            onClick={() => navigate("/cryptocurrencies")}
            id="digiverse-logo"
            src={digiLogo}
            alt=""
          />
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
            <NavLink
              to={Object.keys(user).length !== 0 ? "/profile" : "/login"}
            >
              <button>Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
