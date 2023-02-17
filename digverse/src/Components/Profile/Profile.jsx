import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import "./Profile.css";
import Nav from "../Nav/Nav";

const Succes = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data?.user);
          setLoading(false);
        }
      });
    };
    getUserData();
  }, []);

  const signOutUser = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("User_Status");
    navigate("/");
  };

  

  const continueTo = () => {
    navigate("/cryptocurrencies");
  };

  return (
    <>
      <Nav />
      {loading ? (
        <div className="profile_template_skeleton">
          <div className="profile_page_left_top_pic_skeleton">
            <RingLoader color="aqua" />
          </div>
        </div>
      ) : (
        <div className="succes">
          {Object.keys(user).length !== 0 ? (
            <>
              <div className="profile_template">
                <div className="profile_page_left_top_pic">
                  <span>{user.email[0].toUpperCase()}</span>
                  <h2>{user.email}</h2>
                </div>
                <div className="profile_buttons">
                  <button onClick={continueTo} className="continue">
                    Start Exploring
                  </button>
                  <button onClick={signOutUser} className="continue">
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>You are not logged in</h1>
              <button onClick={() => navigate("/login")}>
                Go to Login page
              </button>
            </>
          )}
          {/* {Object.keys(user).length !== 0 ? (
        <>
          <h1 id="succes">Succesfully logged in</h1>
          <h1>Signed in as {user?.email}</h1>
          <h2> via {user?.app_metadata?.provider}</h2>
          <button onClick={signOutUser}>sign out</button>
          <button onClick={continueTo} id="continue">
            Continue to DigiVerse
          </button>
        </>
      ) : (
        <>
          <h1>You are not logged in</h1>
          <button onClick={() => navigate("/login")}>Go to Login page</button>
        </>
      )} */}
        </div>
      )}
    </>
  );
};

export default Succes;
