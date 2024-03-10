import React, { FC, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHook";
import { logOut } from "./store/authSlice";
import * as contentConst from '../src/utils/constants/content';
import PrivateRoutes from "./routes/PrivateRoutes";
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
import Admin from "./pages/Admin";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

const App: FC = () => {
  const validateAccessToken = useValidateAccessToken();

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        await validateAccessToken()
      } catch (error) {
      
      } 
    }
    verifyAccessToken()
  }, [])

  console.log("App")
  
  
  return (
    <div className={style.wrapper}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies"element={<Movies />}/>
            <Route path="/movies/:id" element={<Movie />} />
            <Route element={<PrivateRoutes allowedRoles={[contentConst.USER]} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={[contentConst.ADMIN]} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/add-actor" element={<AddActor />} />
            </Route>
          </Routes>
        <Footer />
    </div>
  );
};

export default App;
