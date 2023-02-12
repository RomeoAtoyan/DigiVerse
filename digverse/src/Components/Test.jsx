import React, { useEffect, useState } from "react";
import { supabase } from "./Profile/supabaseClient";

const Test = () => {
  const [user, setUser] = useState(null);

  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const sessionFunction = async () => {
    await supabase.auth.getSession().then((result) => {
      if (result?.data?.session) {
        setUser(result?.data?.session);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    sessionFunction();
  }, []);

  return (
    <div>
      <button onClick={login}>Log in</button>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export default Test;
