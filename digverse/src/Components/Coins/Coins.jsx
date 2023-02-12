import React from "react";
import SingleCoin from "./SingleCoin.jsx";
import { Link } from "react-router-dom";

const Coin = (props) => {
  return (
    <>
      {props.crypto.map((crypto) => {
        return (
            <SingleCoin crypto={crypto} currencySymbol={props.currencySymbol} />
        );
      })}
    </>
  );
};

export default Coin;
