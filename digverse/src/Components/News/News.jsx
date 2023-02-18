import React, { useState, useEffect } from "react";
import "./News.css";
import ClipLoader from "react-spinners/ClipLoader";
import Today from "../Today/Today";
import { useDebounce } from "../Debounce/Debounce";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("Crypto");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const getNews = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "62f920c671msh3ba91345981d596p128993jsn9f1cac9f053b",
        "X-RapidAPI-Host": "crypto-update-live.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://crypto-update-live.p.rapidapi.com/news",
        options
      );
      const data = await response.json();
      setNews(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      {loading ? (
        <section className="all_news_container_skeleton">
          <div className="single_news_container_skeleton">
            <div className="single_news_skeleton">
              <ClipLoader className="ringloader_skeleton" color="white" />
            </div>
          </div>
        </section>
      ) : (
        <section className="all_news_container">
          <div className="single_news_container">
            {news.slice(0, 15).map((art, index) => (
              <div className="single_news" key={index}>
                <h1>{art?.Title}</h1>
                <br />
                <a target="_blank" href={art?.URL} rel="noreferrer">
                  Visit Page
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default News;
