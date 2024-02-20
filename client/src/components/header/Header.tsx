import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import Glasses from "../../assets/pics/cinema.svg";
import Search from "../search/Search";
import Signin from "../forms/auth/Signin";
import Signup from "../forms/auth/Signup";

const Header: FC = () => {

  const [visible, setVisible] = useState<boolean>(false)
  const [visibleSignin, setVisibleSignin] = useState<boolean>(false)
  const [visibleSignup, setVisibleSignup] = useState<boolean>(false)

  console.log(visibleSignin)

  const visibleHandler = () => {
    setVisible(!visible)
  }

  return (
    <>
    <div className={style["nav-area"]}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link to={"/"}>
            <img src={Glasses} alt="" />
            <span>kino</span>
          </Link>
        </div>
        <Navbar />
        <div className={style.right}>
        <div onClick={() => setVisible(true)} className={style.search}>
           <FontAwesomeIcon className={style['search-icon']} icon={faSearch} />
        </div>
        <div onClick={() => setVisibleSignin(true)} className={style.auth}>
          <FontAwesomeIcon className={style['auth-icon']} icon={faUser} />
          <span>Войти</span>
        </div>
        </div>
      </div>
    </div>
    {visible && <Search  visible={visible} visibleHandler={visibleHandler}/>}
    {visibleSignin && <Signin />}
    {visibleSignup && <Signup />}
    </>
  );
};

export default Header;
