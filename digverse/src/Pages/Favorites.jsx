import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Nav from "../Components/Nav/Nav";
import { supabase } from "../Components/Profile/supabaseClient";
import { Link } from "react-router-dom";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  async function getFavoriteCrypto() {
    let { data: cryptocurrencies, error } = await supabase
      .from("favorite_crypto")
      .select("*");
    if (cryptocurrencies) {
      console.log(cryptocurrencies);
      setFavorites(cryptocurrencies);
    }
    if (error) {
      console.log(error);
      setFavorites([]);
    }
  }

  useEffect(() => {
    getFavoriteCrypto();
  }, []);

  return (
    <>
      <Nav />
      <div>YOU ARE IN THE FAVORITES PAGE</div>
      <div className="favorite_coin_container">
        {favorites.map((coin) => (
          <>
            <Link className="link" to={`/cryptocurrencies/${coin.coinID}`}>
              <div className="favorite_coin">
                <img src={coin.image} width="100px" alt="" srcset="" />
                <h1>{coin.name}</h1>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};

export default Favorites;
