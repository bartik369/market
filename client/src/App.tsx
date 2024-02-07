import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import style from "./App.module.css";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import AddMedia from "./pages/AddMedia";
import Footer from "./components/footer/Footer";
import AddActor from "./pages/AddActor";

const App: FC = () => {
  console.log('render')
  return (
    <div className={style.wrapper}>
      <header className={style['header-wrap']}>
        <div className={style.container}>
          <Header />
        </div>
      </header>
      <main className={style['main-wrap']}>
        <div className={style.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/add-media" element={<AddMedia />} />
            <Route path="/add-actor" element={<AddActor />} />
          </Routes>
        </div>
      </main>
      <footer className={style.footer}>
      <div className={style.container}>
        <Footer />
        </div>
      </footer>
    </div>
  );
};

export default App;
