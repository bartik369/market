import React, {FC, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { useSignupUserMutation } from '../../../store/authApi';
import style from './Auth.module.css'

interface ISignupProps  {
    signinHandler: () => void;
    closeFormHandler: () => void;
}

const Signup: FC<ISignupProps> = ({signinHandler, closeFormHandler}) => {

    const dispatch = useAppDispatch()
    const [passwordType, setPasswordType] = useState(false);
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [signupUser, {isLoading}] = useSignupUserMutation()
    const showPassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setPasswordType(passwordType ? false : true);
    };

    const create = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
         if (authData) {
             let userData = {
                 email: authData.email,
                 password: authData.password
             }
            await signupUser(userData).unwrap()
         }
    }

    return (
        <div className={style.auth}>
            <form className={style.form} action='' onSubmit={create}>
                <div>ваша почта</div>
                <input type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, email: e.target.value})
                }
                 />
                <div>ваш пароль</div>
                <input type={passwordType ? 'text' : 'password'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, password: e.target.value})
                }
                />
                <button onClick={showPassword}>show</button>
                  <div> повторите ваш пароль</div>
                <input type={passwordType ? 'text' : 'password'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, repeatPassword: e.target.value})
                }
                />
                <div>
                <div className={style.text} onClick={signinHandler}>Уже есть акккаунт?</div>
                </div>
                <button>Отправить</button>
            </form>
            <button  className={style.close} onClick={closeFormHandler}>close</button>
        </div>
    );
};

export default Signup;