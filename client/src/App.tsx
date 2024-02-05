import React from "react";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import style from "./App.module.css";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import AddMedia from "./pages/AddMedia";

const App: FC = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/add-media" element={<AddMedia />} />
      </Routes>
    </div>
  );
};

export default App;
