import React from "react";
import "./Intro.css";
import moon from "../assets/moon.png";
import rocket from "../assets/rocket.png";
import { useNavigate } from "react-router-dom";

const Intro = () => {

  const navigate = useNavigate();

  const exploreBtn = () => {
    navigate('/cryptocurrencies')
  }

  return (
    <>
      <div className="welcome_container">
        <div className="intro_container">
            <h1>Welcome</h1>
            <p>To my Crypto App</p>
            <p>Experience the convenience of a user-friendly interface</p>
            <button onClick={exploreBtn}>Explore</button>
        </div>
        <div></div>
        <div className="moon_section">
          <img id="moon" src={moon} alt="" />
          <img id="rocket" src={rocket} alt="" />
        </div>
      </div>
    </>
  );
};

export default Intro;
