import "./App.css";
import React from "react";
import WelcomePage from "./Pages/WelcomePage";
import NewsPage from "./Pages/NewsPage";
import CryptoPage from "./Pages/CryptoPage";
import { Route, Routes } from "react-router-dom";
import CoinID from "./Components/Coins/CoinID";
import LoginPage from "./Pages/LoginPage";
import Profile from "./Components/Profile/Profile";
import Favorites from "./Pages/Favorites";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<WelcomePage />} />
        <Route path="/welcome" exact element={<WelcomePage />} />
        <Route path="/cryptocurrencies" element={<CryptoPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/cryptocurrencies/:coinId" element={<CoinID />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
