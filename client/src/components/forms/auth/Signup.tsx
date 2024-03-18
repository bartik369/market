import React, { FC, useEffect, useState } from "react";
import { useSignupUserMutation } from "../../../store/authApi";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { setCredentials } from "../../../store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validate from '../../../middleware/validateAuth'
import { IUserAuth } from "../../../types/auth";
import { ToastContainer, toast } from 'react-toastify';
import { faEye, faEyeSlash, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from "../../../utils/constants/content";
import style from "./Auth.module.css";
import 'react-toastify/dist/ReactToastify.css';

interface ISignupProps {
  signinHandler: () => void;
  closeFormHandler: () => void;
}

const Signup: FC<ISignupProps> = ({ signinHandler, closeFormHandler }) => {
  type Errors = Partial<Record<keyof IUserAuth, string>>
  type Touched = Partial<Record<keyof IUserAuth, boolean>>
  const dispatch = useAppDispatch();
  const [passwordType, setPasswordType] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const [errors, setErrors] = useState<Errors>(validate(authData));
  const [touched, setTouched] = useState<Touched>({});
  const showPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };

  const create = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (errors?.email?.length === 0 && errors?.password?.length === 0) {
      let userData = {
        email: authData.email,
        password: authData.password,
      };
      await signupUser(userData)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        closeFormHandler();
      })
      .catch((error) => toast.error(error.data.message));
    }

    // if (authData) {
    //   let userData = {
    //     email: authData.email,
    //     password: authData.password,
    //   };
    //   await signupUser(userData);
    // }
  };


  return (
    <div className={style.auth}>
       <div className={style.toast}>
      <ToastContainer
      theme="colored"
      autoClose={7000}
      position="top-center"
       />
       </div>
      <form className={style.form} action="" onSubmit={create}>
        <span className={style.title}>{contentConst.signupTitle}</span>
        {errors.email && touched.email ? <p>{errors.email}</p> : null}
        <span className={style.label}>{contentConst.email}</span>
        <div className={style['input-data']}>
          <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
          <input
            className={style.data}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, email: e.target.value })
              setErrors(validate({ ...authData, email: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, email: true })}
          />
        </div>
        {errors.password && touched.password ? <p>{errors.password}</p> : null}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, password: e.target.value })
              setErrors(validate({...authData, password: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
        </div>
        {errors.repeatPassword && touched.repeatPassword ? <p>{errors.repeatPassword}</p> : null}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAuthData({ ...authData, repeatPassword: e.target.value })
              setErrors(validate({...authData, repeatPassword: e.target.value }))
            }}
            onBlur={() => setTouched({ ...touched, repeatPassword: true })}
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
