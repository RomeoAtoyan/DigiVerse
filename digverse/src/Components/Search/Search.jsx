import React, { useState, useEffect } from "react";
import "./Search.css";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { useDebounce } from "../Debounce/Debounce";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchedCoin, setSearchedCoin] = useState([]);
  const [loading, setLoading] = useState(true);

  async function searchCoinData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );
      const data = await response.json();
      setSearchedCoin(data.coins);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedSearch = useDebounce(search, 500);

  const searchCoin = () => {
    const search_input = document.getElementById("search_coin").value;
    let search_results = document.querySelector(".search_results");
    search_results.style.display = "none";
    setSearch(search_input);
    if (search_input === "") {
      search_results.style.display = "none";
      setSearchedCoin([]);
    } else {
      search_results.style.display = "flex";
    }
  };

  useEffect(() => {
    if (debouncedSearch) {
      searchCoinData();
    }
  }, [debouncedSearch]);

  return (
    <>
      <div className="search_section">
        <div className="search_input">
          <input
            onChange={searchCoin}
            type="text"
            placeholder="Search Coins"
            id="search_coin"
          />
          <i className="fa-solid fa-magnify fa-magnifying-glass"></i>
        </div>
        <div className="search_results">
          {searchedCoin.map((coin) => (
            <Link
              className="search_results_link"
              to={`/cryptocurrencies/${coin.id}`}
              key={coin.id}
            >
              {loading ? (
                <div className="search_results">
                  <RingLoader color="aqua" />
                </div>
              ) : (
                <div className="search_result">
                  <img src={coin.large} alt="" srcSet="" />
                  <h3>
                    {coin.name} <span>#{coin?.market_cap_rank}</span>
                  </h3>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
