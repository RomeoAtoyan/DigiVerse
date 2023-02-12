import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../Profile/supabaseClient";
import { useEffect, useState } from "react";

// const SingleCoin = (props) => {
//   const [loggedIn, setLoggedIn] = useState(false);



//   const setFavorites = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     const { data, error } = await supabase.from("favorite_crypto").insert([
//       {
//         name: props.crypto.name,
//         coinID: props.crypto.id,
//         image: props.crypto.image,
//         // price: props.crypto.current_price,
//         // price_change: props.crypto.price_change_percentage_24h.toFixed(2),
//         user_id: user.id,
//       },
//     ]);
//   };

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const { data } = await supabase.auth.getUser();
//         setLoggedIn(true);
//       } catch (error) {
//         setLoggedIn(false);
//       }
//     };
//     checkLoginStatus();
//   }, []);

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
//               <h3>
//                 #{props?.crypto?.market_cap_rank} {props.crypto.name}
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
//           {/* <i onClick={setFavorites} className="fa-regular fa-bookmark"></i> */}
//           {loggedIn && (
//             <i onClick={setFavorites} className="fa-regular"></i>)}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleCoin;

const SingleCoin = (props) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUsers(userData.user);
    };
    fetchUser();
  }, []);

  const setFavorites = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("favorite_crypto").insert([
      {
        name: props.crypto.name,
        coinID: props.crypto.id,
        image: props.crypto.image,
        user_id: user.id,
      },
    ]);
  };

  return (
    <>
      <div className="single_crypto">
        <img src={props?.crypto?.image} alt="crypto-img" />
        <div className="crypto_description">
          <div className="crypto_symbol">
            <Link
              className="link"
              to={`/cryptocurrencies/${props.crypto.id}`}
              key={props.crypto.id}
            >
              <h3>
                #{props?.crypto?.market_cap_rank} {props.crypto.name}
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
          {users ? (
        <i onClick={setFavorites} className="fa-regular fa-bookmark"></i>
      ) : null}

        </div>
      </div>
    </>
  );
};

export default SingleCoin;
