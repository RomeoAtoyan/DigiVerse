import React from "react";
import HeadNews from "../Components/HeadNews/HeadNews";
import Nav from "../Components/Nav/Nav";
import News from "../Components/News/News";
import BackButton from "../Components/BackButton/BackButton";
const NewsPage = () => {
  return (
    <>
      <Nav />
      <div className="news_page_wallpaper">
        <BackButton page="/cryptocurrencies" />
        <div className="news_page_wallpaper_title">
          <h1>
            Welcome to the World of Cryptocurrency: Your One-Stop Crypto News
            Page
          </h1>
        </div>
      </div>
      <News />
    </>
  );
};

export default NewsPage;
