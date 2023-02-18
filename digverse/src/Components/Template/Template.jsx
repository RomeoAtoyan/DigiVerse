import React, { useEffect, useState } from "react";
import { supabase } from "../Profile/supabaseClient";

const Template = ({ crypto, setCrypto }) => {
  const [users, setUsers] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

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

  const sortByLowToHigh = (property) => {
    const sortedCrypto = [...crypto].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
    setCrypto(sortedCrypto);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <div className="single_crypto_template">
        <div className="crypto_description">
          <div className="crypto_symbol">
            <h3>
              Coin{" "}
               {sortOrder === "asc" ? (
                <i className="fa-solid fa-arrow-up"></i>
              ) : (
                <i className="fa-solid fa-arrow-down"></i>
              )}
            </h3>
            <h6>symbol</h6>
          </div>
          <h5
            className="price"
            onClick={() => sortByLowToHigh("current_price")}
          >
            Price{" "}
          </h5>
          <div
            className="crypto_price_change"
            onClick={() => sortByLowToHigh("price_change_percentage_24h")}
          >
            <h5>Change </h5>
          </div>
          <h5 id="market_cap_h5" onClick={() => sortByLowToHigh("market_cap")}>
            Market Cap{" "}
          </h5>
          {users ? (
            <i
              onMouseOver={toggleTooltip}
              className="fa-regular tooltipHover fa-bookmark"
            >
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
