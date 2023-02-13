import React, { useState, useEffect } from "react";
import "./News.css";
import ClipLoader from "react-spinners/ClipLoader";
import Today from '../Today/Today';
import { useDebounce } from "../Debounce/Debounce";

const News = () => {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("Crypto");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const getNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${searchTerm}&from=${(
          <Today />
        )}&sortBy=popularity&apiKey=2851cfd2dd3f461789e36aca7da73030`
      );
      const data = await response.json();
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let timeoutId;
    if (searchTerm) {
      timeoutId = setTimeout(() => {
        getNews(searchTerm);
      }, 500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedSearch]);

  return (
    <>
    <div className="searchbar">
            <input
              onChange={handleSearch}
              placeholder="Search News"
              id="search_news"
              type="text"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
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
            {news.articles?.slice(0, 15).map((art, index) => (
              <div className="single_news" key={index}>
                <img
                  alt=""
                  style={{ objectFit: "contain" }}
                  height={60}
                  src={art?.urlToImage}
                />
                <div className="single_news_description">
                  <h1>{art?.title}</h1>
                  <>
                    <br />
                    <aside>
                      <span>{art?.source?.name}</span>
                      <ul>
                        <li>
                          <a target="_blank" href={art?.url} rel="noreferrer">
                            Visit Page
                          </a>
                        </li>
                      </ul>
                    </aside>
                  </>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default News;
