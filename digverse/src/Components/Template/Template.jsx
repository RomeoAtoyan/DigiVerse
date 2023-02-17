import React, { useEffect, useState } from "react";
import { supabase } from "../Profile/supabaseClient";

const Template = () => {
  const [users, setUsers] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUsers(userData.user);
    };
    fetchUser();
  }, []);

  const toggleTooltip = () => {
    setTooltip(!tooltip);
  };

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
          {users ? (
            <i onMouseOver={toggleTooltip} className="fa-regular tooltipHover fa-bookmark">
              {tooltip ? (
                <div className="tooltip">
                  Add favorite coins to view in the favorites page
                </div>
              ) : (
                ""
              )}
            </i>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Template;
