// import React from "react";
// import { Link } from "react-router-dom";
// import { supabase } from "../Profile/supabaseClient";
// import { useEffect, useState } from "react";

// const SingleCoin = (props) => {
//   const [users, setUsers] = useState(null);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: userData } = await supabase.auth.getUser();
//       setUsers(userData.user);
//     };
//     fetchUser();
//   }, []);

//   const handleSetFavorites = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     const { data, error } = await supabase.from("favorite_crypto").insert([
//       {
//         name: props.crypto.name,
//         coinID: props.crypto.id,
//         image: props.crypto.image,
//         user_id: user.id,
//       },
//     ]);
//     setFavorites([...favorites, props.crypto.id]);
//   };

//   return (
//     <>
//       <div className="single_crypto">
//         <img src={props?.crypto?.image} alt="crypto-img" />
//         <div className="crypto_description">
//           <div className="crypto_symbol">
//             <Link
//               className="link"
//               to={`/cryptocurrencies/${props.crypto.id}`}
//               key={props.crypto.id}
//             >
//               <h3 className={props?.crypto?.name?.length > 8 ? 'mobile_small_font' : ""}>
//                 <span className="hide_mobile">#{props?.crypto?.market_cap_rank}</span> {props.crypto.name}
//               </h3>
//             </Link>
//             <h6>{props?.crypto?.symbol}</h6>
//           </div>
//           <h5 className="price">
//             {props?.crypto?.current_price > 999.99
//               ? props?.crypto?.current_price.toLocaleString()
//               : props?.crypto?.current_price}{" "}
//             {props.currencySymbol}
//           </h5>
//           <div className="crypto_price_change">
//             <h5>
//               {props?.crypto?.price_change_percentage_24h?.toFixed(2)} %{" "}
//               {props?.crypto?.price_change_percentage_24h <= 0 ? (
//                 <i className="fa-solid fa-arrow-down"></i>
//               ) : (
//                 <i className="fa-solid fa-arrow-up"></i>
//               )}
//             </h5>
//             <br />
//           </div>
//           <h5 id="market_cap_h5">
//             {props?.crypto?.market_cap.toLocaleString()} €
//           </h5>
//           {users ? (
//             <i onClick={handleSetFavorites} className={`fa-bookmark ${
//               favorites.includes(props.crypto.id) ? "fa-solid" : "fa-regular"
//             }`}></i>
//           ) : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleCoin;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../Profile/supabaseClient";

const SingleCoin = (props) => {
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        const { data: favoritesData } = await supabase
          .from("favorite_crypto")
          .select("*")
          .eq("user_id", user.id)
          .eq("coinID", props.crypto.id);
        setIsFavorite(favoritesData.length > 0);
      }
    };
    fetchUserFavorites();
  }, [user, props.crypto.id]);

  const addFavorite = async () => {
    if (user) {
      await supabase.from("favorite_crypto").insert([
        {
          name: props.crypto.name,
          coinID: props.crypto.id,
          image: props.crypto.image,
          user_id: user.id,
        },
      ]);
      setIsFavorite(true);
    }
  };

  const removeFavorite = async () => {
    if (user) {
      await supabase
        .from("favorite_crypto")
        .delete()
        .eq("user_id", user.id)
        .eq("coinID", props.crypto.id);
      setIsFavorite(false);
    }
  };

  return (
    <div className="single_crypto">
      <img src={props?.crypto?.image} alt="crypto-img" />
      <div className="crypto_description">
        <div className="crypto_symbol">
          <Link
            className="link"
            to={`/cryptocurrencies/${props.crypto.id}`}
            key={props.crypto.id}
          >
            <h3
              className={
                props.crypto?.name?.length > 10 ? "mobile_font_smaller" : " "
              }
            >
              <span className="hide_mobile">
                #{props?.crypto?.market_cap_rank}
              </span>{" "}
              {props.crypto.name}
            </h3>
          </Link>
          <h6>{props?.crypto?.symbol}</h6>
        </div>
        <h5 className="price">
          {props?.crypto?.current_price > 999.99
            ? props?.crypto?.current_price.toLocaleString()
            : props?.crypto?.current_price}{" "}
          {props.currencySymbol}
        </h5>
        <div className="crypto_price_change">
          <h5>
            {props?.crypto?.price_change_percentage_24h?.toFixed(2)} %{" "}
            {props?.crypto?.price_change_percentage_24h <= 0 ? (
              <i className="fa-solid fa-arrow-down"></i>
            ) : (
              <i className="fa-solid fa-arrow-up"></i>
            )}
          </h5>
          <br />
        </div>
        <h5 id="market_cap_h5">
          {props?.crypto?.market_cap.toLocaleString()} €
        </h5>
        {user && (
          <>
            {isFavorite ? (
              <i className="fa-solid fa-bookmark" onClick={removeFavorite}></i>
            ) : (
              <i className="fa-regular fa-bookmark" onClick={addFavorite}></i>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleCoin;
