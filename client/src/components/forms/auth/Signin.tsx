import React, {FC, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { IUserAuth } from '../../../types/auth';
import { useSigninUserMutation } from '../../../store/authApi';
import { setCredentials } from '../../../store/authSlice';
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
                <div>ваша почта</div>
                <input type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, email: e.target.value})
                }
                 />
                <div>ваш паролт</div>
                <button onClick={showPassword}>show</button>
                <input type={passwordType ? 'text' : 'password'} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, password: e.target.value})
                }
                />
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