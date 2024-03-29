import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CoinID.css";
import BackButton from "../BackButton/BackButton";
import Social from "../SocialMedia/Social";
import RingLoader from "react-spinners/RingLoader";
import Chart from "../Chart/Chart";
import Nav from "../Nav/Nav";
import { currencies } from "../../DropdownOptions/Options";

const CoinID = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trendCoin, setTrendCoin] = useState([]);
  const [currency, setCurrency] = useState("eur");
  const [description, setDescription] = useState({});
  const navigate = useNavigate();

  //  anchor tags wegdoen van description //
  const textDescription = new DOMParser().parseFromString(
    description,
    "text/html"
  ).body.textContent;

  const getSingleCoin = async (id, props) => {
    let usedId;
    id ? (usedId = id) : (usedId = coinId);
    id && navigate(`/cryptocurrencies/${id}`);

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${usedId}`
      );
      const data = await response.json();
      setCoin(data);
      setLoading(false);
      setDescription(data.description?.en);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const getTrendingCoin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      const data = await response.json();
      setTrendCoin(data.coins);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const getCurrValue = (e) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    getSingleCoin();
    getTrendingCoin();
  }, []);

  const whichCurrency =
    currency === "eur" ? " €" : currency === "usd" ? " $" : " £";

  return (
    <>
      <Nav />
      <div className="coin_id_top_buttons">
        <BackButton page={"/cryptocurrencies"} />
        <select onChange={getCurrValue} id="currencyResult2">
          {currencies.map((item, index) => (
            <option key={index} value={item.value}>
              {item.content}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="general_container_skeleton">
          <RingLoader color="aqua" />
        </div>
      ) : (
        <div className="general_container">
          <div className="single_coin_id_chart animate__animated animate__fadeIn">
            <div className="price__info">
              <h1>
                {coin.name} <span id="coin_rank">#{coin.coingecko_rank}</span>{" "}
              </h1>
              <div className="low_high prices__ups__downs">
                <span className="coin_lowest">
                  {coin.market_data?.low_24h[currency] > 999.99
                    ? coin.market_data?.low_24h[currency].toLocaleString()
                    : coin.market_data?.low_24h[currency]}
                  {whichCurrency}
                </span>
                <span className="coin_highest">
                  {coin.market_data?.high_24h[currency] > 999.99
                    ? coin.market_data?.high_24h[currency].toLocaleString()
                    : coin.market_data?.high_24h[currency]}
                  {whichCurrency}
                </span>
              </div>
            </div>
            <div className="single_coin_price_section">
              <img src={coin?.image?.large} alt="" />
              <div className="coin_id_price">
                <h1>
                  {coin?.market_data?.current_price[currency] > 999.99
                    ? coin?.market_data?.current_price[
                        currency
                      ].toLocaleString()
                    : coin?.market_data?.current_price[currency]}{" "}
                  {currency === "eur" ? "€" : currency === "usd" ? "$" : "£"}
                </h1>
                <h2
                  className={
                    coin?.market_data?.price_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }
                >
                  {coin?.market_data?.price_change_percentage_24h < 0
                    ? coin?.market_data?.price_change_percentage_24h_in_currency[
                        currency
                      ].toFixed(2)
                    : coin?.market_data?.price_change_percentage_24h_in_currency[
                        currency
                      ].toFixed(2)}{" "}
                  %
                </h2>
              </div>
            </div>
            <div className="coin_description">
              <Chart currency={currency} usedId={coinId} />
            </div>
          </div>
          {loading ? (
            <RingLoader color="aqua" />
          ) : (
            <div className="trending_coin_container animate__animated animate__fadeInRight">
              <div className="trending_coin">
                <h1>Trending Coins</h1>
                {trendCoin.map((trend) => (
                  <div
                    className="trend"
                    onClick={() => getSingleCoin(trend.item.id)}
                    key={trend.item.id}
                  >
                    <img src={trend.item.small} alt="" srcSet="" />
                    <p>{trend.item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CoinID;
