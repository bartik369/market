import React, {FC, useState} from 'react';
import { IUser } from '../../../types/auth';
import style from './Auth.module.css';

interface ISigninProps  {
    signupHandler: () => void;
    closeFormHandler: () => void;
}

const Signin:FC<ISigninProps> = ({signupHandler, closeFormHandler}) => {

    const [authData, setAuthData] = useState<IUser>({
        email: '',
        password: '',
    })
    return (
        <div className={style.auth}>
            <form className={style.form} action="">
                <div>ваша почта</div>
                <input type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, email: e.target.value})
                }
                 />
                <div>ваш паролт</div>
                <input type="password" 
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