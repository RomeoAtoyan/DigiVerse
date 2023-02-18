// import React from "react";
// import "./HeadNews.css";
// import { useState, useEffect } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import Today from "../Today/Today";

// const News = () => {
//   const [headNews, setHeadNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getNews = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": "62f920c671msh3ba91345981d596p128993jsn9f1cac9f053b",
//         "X-RapidAPI-Host": "crypto-update-live.p.rapidapi.com",
//       },
//     };

//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://crypto-update-live.p.rapidapi.com/news",
//         options
//       );
//       const data = await response.json();
//       setHeadNews(data);
//       console.log(data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getNews();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <section className="crypto_news_container_skeleton">
//           <ClipLoader className="pacman_loader" color="white" />
//         </section>
//       ) : (
//         <section className="crypto_news_container">
//           <div className="head_news_container">
//             <aside>
//               <span>{source?.name}</span>
//             </aside>
//             <br />
//             <h1>{title}</h1>
//             <p>{description}</p>
//             <button>
//               <a target="_blank" href={url} rel="noreferrer">
//                 Read More
//               </a>
//             </button>
//           </div>
//           <aside className="head_news_image">
//             <img src={urlToImage} alt="" srcSet="" />
//           </aside>
//         </section>
//       )}
//     </>
//   );
// };

// export default News;
