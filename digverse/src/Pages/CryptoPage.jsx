import React, { useState, useEffect } from "react";
import "./CryptoPage.css";
import Template from "../Components/Template/Template";
import Coins from "../Components/Coins/Coins";
import News from "../Components/News/News";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "../Components/Search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav/Nav";
import "animate.css";
import Video from "../Components/Video/Video";
import cryptovideo from "../Components/Video/cryptovideo.mp4";
import { currencies, resultsPerPage } from "../DropdownOptions/Options";

const CryptoPage = () => {
  const [crypto, setCrypto] = useState([]);
  const [page, setPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(25);
  const [selectedValue, setSelectedValue] = useState(25);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("eur");
  const [currencySymbol, setCurrencySymbol] = useState("€");

  const location = useLocation();
  const navigate = useNavigate();

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getCoinData(nextPage);
    navigate(`${location.pathname}?page=${nextPage}`);
  };

  const handlePrevPage = () => {
    setPage(Math.max(page - 1, 1));
    getCoinData(Math.max(page - 1, 1));
    navigate(`${location.pathname}?page=${Math.max(page - 1, 1)}`);
  };

  const getResultValue = () => {
    const selectedPPvalue = document.getElementById("result_per_page").value;
    setResultPerPage(selectedPPvalue);
    setSelectedValue(selectedPPvalue);
  };

  const getCurrValue = () => {
    const selectedCurrValue = document.getElementById("currencyResult").value;
    setCurrency(selectedCurrValue);
    setCurrencySymbol("€");
    setSelectedValue(selectedCurrValue);
    if (selectedCurrValue === "eur") {
      setCurrencySymbol("€");
    } else if (selectedCurrValue === "usd") {
      setCurrencySymbol("$");
    } else if (selectedCurrValue === "gbp") {
      setCurrencySymbol("£");
    }
  };

  async function getCoinData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${resultPerPage}&page=${page}&sparkline=false`
      );
      const data = await response.json();
      setCrypto(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCoinData(page, resultPerPage, currency);
  }, [page, resultPerPage, currency]);

  return (
    <>
      <Nav />
      <Video src={cryptovideo} />
      <Search />
      {loading ? (
        <main className="all_container_skeleton">
          <aside className="crypto_section_skeleton">
            <ClipLoader className="ringloader_crypto" color="white" />
          </aside>
        </main>
      ) : (
        <main className="all_container">
          <aside className="crypto_section animate__animated animate__fadeInUp">
            <div className="select_preferences">
              <select
                onChange={getResultValue}
                value={selectedValue}
                id="result_per_page"
                name="resultPP"
              >
                {resultsPerPage.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.content}
                  </option>
                ))}
              </select>
              <select
                onChange={getCurrValue}
                value={selectedValue}
                id="currencyResult"
              >
                {currencies.map((currency, index) => (
                  <option key={index} value={currency.value}>{currency.content}</option>
                ))}
              </select>
            </div>
            <Template setCrypto={setCrypto} crypto={crypto} />
            <Coins crypto={crypto} currencySymbol={currencySymbol} />
            <div className="page_buttons">
              <i
                onClick={handlePrevPage}
                className="fa-solid fa-angle-left"
              ></i>
              <span>{page}</span>
              <i
                onClick={handleNextPage}
                className="fa-solid fa-angle-right"
              ></i>
            </div>
            <p id="coinrankinfo">*All coins are ranked by market cap rank</p>
          </aside>
          <aside className="widget_section">
            <News />
          </aside>
        </main>
      )}
    </>
  );
};

export default CryptoPage;
