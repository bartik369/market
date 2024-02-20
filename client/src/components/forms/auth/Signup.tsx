import React, {FC, useState} from 'react';
import style from './Auth.module.css'

interface ISignupProps  {
    signinHandler: () => void;
    closeFormHandler: () => void;
}

const Signup: FC<ISignupProps> = ({signinHandler, closeFormHandler}) => {

    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
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
                <div>ваш пароль</div>
                <input type="password" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, password: e.target.value})
                }
                />
                  <div> повторите ваш пароль</div>
                <input type="password" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setAuthData({...authData, repeatPassword: e.target.value})
                }
                />
                <div>
                <div className={style.text} onClick={signinHandler}>Уже есть акккаунт?</div>
                </div>
                <button>Отправить</button>
            </form>
            <button className={style.close} onClick={closeFormHandler}>close</button>
        </div>
    );
};

export default Signup;