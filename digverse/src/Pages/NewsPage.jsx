import React from "react";
import HeadNews from "../Components/HeadNews/HeadNews";
import Nav from "../Components/Nav/Nav";
import News from "../Components/News/News";
import BackButton from "../Components/BackButton/BackButton"
const NewsPage = () => {
  return (
    <>
    <Nav/>
    <br />
    <BackButton page="/cryptocurrencies"/>
      <HeadNews />
      <News />
    </>
  );
};

export default NewsPage;
