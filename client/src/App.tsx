import React, { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHook";
import { logOut } from "./store/authSlice";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import style from "./App.module.css";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";
import Footer from "./components/footer/Footer";
import AddActor from "./pages/AddActor";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import { useValidateAccessToken } from "./store/apiSlice";


const App: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const validateAccessToken = useValidateAccessToken()

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        await validateAccessToken()
      } catch (error) {
      
      } 
    }
    !token && verifyAccessToken()
  }, [token])
  
  return (
    <div className={style.wrapper}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/add-actor" element={<AddActor />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        <Footer />
    </div>
  );
};

export default App;
