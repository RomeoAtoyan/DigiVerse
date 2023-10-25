import React from "react";
import Nav from "../Components/Nav/Nav";
import News from "../Components/News/News";
import BackButton from "../Components/BackButton/BackButton";
import Video from "../Components/Video/Video";
import newsvideo from "../Components/News/newsvideo.mp4";
const NewsPage = () => {
  return (
    <>
      <Nav />
      <Video src={newsvideo} />
      <BackButton page="/cryptocurrencies" />
      <News />
    </>
  );
};

export default NewsPage;
