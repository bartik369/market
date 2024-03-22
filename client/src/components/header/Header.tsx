import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Glasses from "../../assets/pics/cinema.svg";
import Search from "../search/Search";
import Signin from "../forms/auth/Signin";
import Signup from "../forms/auth/Signup";
import { useAppSelector } from "../../hooks/reduxHook";
import style from "./Header.module.css";
import ProfileMenu from "../navigation/ProfileMenu";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

const Header: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [visibleSignin, setVisibleSignin] = useState<boolean>(false);
  const [visibleSignup, setVisibleSignup] = useState<boolean>(false);
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);
  const location = useLocation();
  const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/)

  const visibleHandler = () => {
    setVisible(!visible);
  };
  const signinHandler = () => {
    setVisibleSignin(true);
    setVisibleSignup(false);
  };
  const signupHandler = () => {
    setVisibleSignup(true);
    setVisibleSignin(false);
  };
  const closeFormHandler = () => {
    setVisibleSignup(false);
    setVisibleSignin(false);
  };

  window.onclick = function() {
    profileMenu && setProfileMenu(!profileMenu)
  }

  return (
    <>
    {visible && <Search visible={visible} visibleHandler={visibleHandler} />}
      <div className={regEx ? style["nav-absolute"] : style["nav-relative"]}>
        <div className={style.container}>
            <Link className={style.logo} to={"/"}>
              <img src={Glasses} alt="" />
              <div className={style.bold}>film</div>
              <span>library</span>
            </Link>
          <Navbar />
          <div className={style.right} onClick={e => e.stopPropagation()}>
            <div onClick={() => setVisible(true)} className={style.search}>
              <FontAwesomeIcon
                className={style["search-icon"]}
                icon={faSearch}
              />
            </div>
            {user && token ? (
              <div onClick={() => setProfileMenu(!profileMenu)}>
                <FontAwesomeIcon className={style.bars} icon={faBars} />
              </div>
            ) : (
              <div
                onClick={() => setVisibleSignin(true)}
                className={style.auth}
              >
                <FontAwesomeIcon className={style["auth-icon"]} icon={faUser} />
                <span>Войти</span>
              </div>
            )}
             {profileMenu && <ProfileMenu 
             setProfileMenu={setProfileMenu}
             profileMenu={profileMenu}
              />}
          </div>
        </div>
        <div className={style.breadcrumbs}>
        <Breadcrumbs />
        </div>
      
      </div>
      {visibleSignin && (
        <Signin
          signupHandler={signupHandler}
          closeFormHandler={closeFormHandler}
        />
      )}
      {visibleSignup && (
        <Signup
          signinHandler={signinHandler}
          closeFormHandler={closeFormHandler}
        />
      )}
    </>
  );
};

export default Header;
