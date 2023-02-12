import React from "react";

const Template = () => {
  return (
    <>
      <div className="single_crypto_template">
        <div className="crypto_description">
          <div className="crypto_symbol">
            <h3>Coin</h3>
            <h6>symbol</h6>
          </div>
          <h5 className="price">Price</h5>
          <div className="crypto_price_change">
            <h5>Change</h5>
          </div>
          <h5 id="market_cap_h5">Market Cap</h5>
          <i className="fa-regular fa-bookmark"></i>
        </div>
      </div>
    </>
  );
};

export default Template;
