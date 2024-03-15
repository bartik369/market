import React, { FC, useState } from "react";
import { useSignupUserMutation } from "../../../store/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from "../../../utils/constants/content";
import style from "./Auth.module.css";

interface ISignupProps {
  signinHandler: () => void;
  closeFormHandler: () => void;
}

const Signup: FC<ISignupProps> = ({ signinHandler, closeFormHandler }) => {
  const [passwordType, setPasswordType] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const showPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };

  const create = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (authData) {
      let userData = {
        email: authData.email,
        password: authData.password,
      };
      await signupUser(userData);
    }
  };

  return (
    <div className={style.auth}>
      <form className={style.form} action="" onSubmit={create}>
        <span className={style.title}>{contentConst.signupTitle}</span>
        <span className={style.label}>{contentConst.email}</span>
        <div className={style['input-data']}>
          <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
          <input
            className={style.data}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, email: e.target.value })
            }
          />
        </div>
        <span className={style.label}>{contentConst.password}</span>
        <div className={style['input-data']}>
          {passwordType ? (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEyeSlash}
            />
          ) : (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEye}
            />
          )}
          <input className={style.data} type={passwordType ? "text" : "password"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, password: e.target.value })
            }
          />
        </div>
        <span className={style.label}>{contentConst.repeatPassword}</span>
        <div className={style['input-data']}>
          {passwordType ? (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEyeSlash}
            />
          ) : (
            <FontAwesomeIcon
              className={style.icon}
              onClick={showPassword}
              icon={faEye}
            />
          )}
          <input className={style.data} type={passwordType ? "text" : "password"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAuthData({ ...authData, repeatPassword: e.target.value })
            }
          />
        </div>
        <p>
          {contentConst.haveAccount}
          <span onClick={signinHandler} className={style.login}>
            {contentConst.login}
          </span>
        </p>
        <button className={style["enter-btn"]}>{contentConst.register}</button>
      </form>
      <button className={style.close} onClick={closeFormHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default Signup;
