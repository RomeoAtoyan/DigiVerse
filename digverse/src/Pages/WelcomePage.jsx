import React from "react";
import Intro from "../Components/Intro/Intro";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  const exploreBtn = () => {
    navigate("/cryptocurrencies");
  };

  useEffect(() => {
    animationOnLoad()
  }, []);

  const animationOnLoad = () => {
    window.addEventListener("load", () => {
      let introtext = document.getElementById("introtext");
      let exploreBtn = document.getElementById("explore_btn");
      setInterval(() => {
        introtext.style.opacity = "100%";
        setInterval(() => {
          introtext.innerText = "Welcome";
        }, 1000);
      }, 1000);

      setInterval(() => {
        exploreBtn.style.opacity = "100%";
      }, 2500);
    });
  };
  return (
    <>
      <div className="intro">
        <h1 id="introtext">DigiVerse</h1>
        <button id="explore_btn" onClick={exploreBtn}>
          Explore
        </button>
      </div>
    </>
  );
};

export default Home;
