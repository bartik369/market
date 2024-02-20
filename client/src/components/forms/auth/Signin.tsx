import React, {FC} from 'react';
import style from './Auth.module.css'

const Signin: FC = () => {
    return (
        <div className={style.auth}>
            <form className={style.form} action="">
                <input type="text" />
            </form>
        </div>
    );
};

export default Signin;