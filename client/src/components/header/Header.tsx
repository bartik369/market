import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import style from './Header.module.css'

const Header: FC = () => {
    return (
        <div className={style['nav-area']}>
            <div className={style.logo}>
                logo
            </div>
        <Navbar />
        </div>
    );
};

export default Header;