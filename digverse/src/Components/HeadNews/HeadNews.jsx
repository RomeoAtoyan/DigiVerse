import React from "react";
import "./HeadNews.css";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Today from "../Today/Today";

const News = () => {
  const [headnews, setHeadNews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNewsData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=Crypto&from=${<Today/>}&sortBy=popularity&apiKey=2851cfd2dd3f461789e36aca7da73030`
      );
      const data = await response.json();
      setHeadNews(data.articles[Math.floor(Math.random() * 100)]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const { description, title, url, urlToImage, source } = headnews;

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <>
      {loading ? (
        <section className="crypto_news_container_skeleton">
          <ClipLoader className="pacman_loader" color="white" />
        </section>
      ) : (
        <section className="crypto_news_container">
          <div className="head_news_container">
            <aside>
              <span>{source?.name}</span>
            </aside>
            <br />
            <h1>{title}</h1>
            <p>{description}</p>
            <button>
              <a target="_blank" href={url} rel="noreferrer">
                Read More
              </a>
            </button>
          </div>
          <aside className="head_news_image">
            <img src={urlToImage} alt="" srcSet="" />
          </aside>
        </section>
      )}
    </>
  );
};

export default News;
