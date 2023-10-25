import React, { useEffect, useState } from "react";
import "./Favorites.css";
import Nav from "../Components/Nav/Nav";
import { supabase } from "../Components/Profile/supabaseClient";
import { Link } from "react-router-dom";
import BackButton from "../Components/BackButton/BackButton";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchFav, setSearchFav] = useState("");
  const [showIcon, setShowIcon] = useState(false);

  const getFavoriteCrypto = async () => {
    let { data: cryptocurrencies, error } = await supabase
      .from("favorite_crypto")
      .select("*");
    if (cryptocurrencies) {
      setFavorites(cryptocurrencies);
    }
    if (error) {
      console.log(error);
      setFavorites([]);
    }
  };

  const deleteFavoriteCoin = async (coinID) => {
    const { error } = await supabase
      .from("favorite_crypto")
      .delete()
      .eq("coinID", coinID);

    if (error) {
      console.log(error);
    } else {
      getFavoriteCrypto();
    }
  };

  const searchFavoriteCoin = (event) => {
    setSearchFav(event.target.value.toLowerCase());
  };

  useEffect(() => {
    getFavoriteCrypto();
  }, []);

  return (
    <>
      <Nav />
      <br />
      <div className="fav_top_buttons_container">
        <BackButton page="/cryptocurrencies" />
        <h3 id="fav_coin_h1">
          You have {favorites.length}{" "}
          {favorites.length === 1 ? "Favorite Coin" : "Favorite Coins"}
        </h3>
      </div>
      <div className="favorite_coin_container animate__animated animate__fadeIn">
        {favorites.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>You have not added any coins</h1>
        ) : (
          <>
            <div className="search_fav_coins">
              <input
                type="text"
                id="searching_fav_coins"
                onChange={searchFavoriteCoin}
                placeholder="Search Favorite Coins"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
              <button
                onClick={() => setShowIcon(!showIcon)}
                style={{ marginLeft: "20px" }}
                className="remove_fav_coins"
              >
                {showIcon ? "Done" : "Remove Coins"}
              </button>
            </div>
            <div
              style={
                !searchFav
                  ? { justifyContent: "center" }
                  : { justifyContent: "left" }
              }
              className="favorite_coin"
            >
              {favorites
                .filter((coin) => coin.name.toLowerCase().includes(searchFav))
                .map((coin, index) => (
                  <>
                    <div key={index} className="favorite_single_coin">
                      <Link
                        className="link"
                        to={`/cryptocurrencies/${coin.coinID}`}
                      >
                        <h1
                          className={
                            coin.name.length > 8 ? "smaller_font" : " "
                          }
                        >
                          {coin.name}
                        </h1>
                      </Link>
                      <img src={coin.image} width="60px" alt="" srcSet="" />
                      {showIcon && (
                        <i
                          onClick={() => deleteFavoriteCoin(coin.coinID)}
                          class="fa-solid fa-xmark"
                        ></i>
                      )}
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Favorites;
