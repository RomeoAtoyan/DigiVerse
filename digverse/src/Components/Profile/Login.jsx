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
        console.log(event);
        const userData = await supabase.auth.getUser();
        localStorage.setItem("User_Status", JSON.stringify(userData.data.user));
        setUser(userData);
        navigate("/profile");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <div className="login_container_supabase">
        <Auth
          autocomplete="off"
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              container: {
                width: "450px",
              },
            },
          }}
          // providers={["github"]}
          theme="dark"
          className="custom-auth"
        />
      </div>
    </>
  );
};

export default Login;
