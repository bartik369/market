import React, {FC, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { IUserAuth } from '../../../types/auth';
import { useSigninUserMutation } from '../../../store/authApi';
import { setCredentials } from '../../../store/authSlice';
import * as contentConst from '../../../utils/constants/content';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import style from './Auth.module.css';

interface ISigninProps  {
    signupHandler: () => void;
    closeFormHandler: () => void;
}

const Signin:FC<ISigninProps> = ({signupHandler, closeFormHandler}) => {
    
    const dispatch = useAppDispatch()
    const signupError = useAppSelector((state) => state.auth.error)
    const [passwordType, setPasswordType] = useState(false);
    const [authData, setAuthData] = useState<IUserAuth>({
        email: '',
        password: '',
    });
    const [signinUser, { isLoading, error }] = useSigninUserMutation()

    const showPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setPasswordType(passwordType ? false : true);
    };

    const login = async (e: {preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            if (authData) {
                const userData = await signinUser(authData).unwrap()
                dispatch(setCredentials(userData))
                closeFormHandler()
          }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={style.auth}>

            <form className={style.form} action="" onSubmit={login}>
                <span className={style.title}>{contentConst.signinTitle}</span>
                <span className={style.label}>{contentConst.email}</span>
                <div className={style.input}>
                    <FontAwesomeIcon className={style.icon} icon={faEnvelope}/>
                <input type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, email: e.target.value})
                }
                 />
                </div>
                <span className={style.label}>{contentConst.password}</span>
                <div className={style.input}>
                {passwordType 
                    ? <FontAwesomeIcon className={style.icon} onClick={showPassword} icon={faEyeSlash} />
                    : <FontAwesomeIcon className={style.icon} onClick={showPassword} icon={faEye}/>
                }
                <input type={passwordType ? 'text' : 'password'} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, password: e.target.value})
                }
                />
                </div>
                <div>
                <div className={style.text} onClick={signupHandler}>Зарегистрироваться</div>
                </div>
                <button>Войти</button>
            </form>
            <button className={style.close} onClick={closeFormHandler}>close</button>
        </div>
    );
};

export default Signin;