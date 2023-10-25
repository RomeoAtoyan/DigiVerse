import React from "react";
import SingleCoin from "./SingleCoin.jsx";

const Coin = (props) => {
  return (
    <>
      {props.crypto.map((crypto, index) => {
        return (
          <SingleCoin
            key={index}
            crypto={crypto}
            currencySymbol={props.currencySymbol}
          />
        );
      })}
    </>
  );
};

export default Coin;
