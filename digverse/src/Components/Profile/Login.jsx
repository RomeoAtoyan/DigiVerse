import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event) => {
  //     if (event === "SIGNED_IN") {
  //       console.log(event);
  //       const loggedIn = localStorage.getItem("User_Status");
  //       if (event === loggedIn) {
  //         return;
  //       }
  //       navigate("/profile");

  //       localStorage.setItem("User_Status", "SIGNED_IN");
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        const userData = await supabase.auth.getUser();
        // localStorage.setItem("User_Status", JSON.stringify(userData.data.user));
        setUser(userData);
        navigate("/cryptocurrencies");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            container: {
              width: "450px",
            },
          },
        }}
        theme="dark"
      />
    </>
  );
};

export default Login;
