import React from "react";
import HeadNews from "../Components/HeadNews/HeadNews";
import Nav from "../Components/Nav/Nav";
import News from "../Components/News/News";

const NewsPage = () => {
  return (
    <>
    <Nav/>
      <HeadNews />
      <News />
    </>
  );
};

export default NewsPage;
