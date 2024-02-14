import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import style from './Header.module.css'
import Glasses from '../../assets/pics/cinema.svg'

const Header: FC = () => {
    return (
        <div className={style['nav-area']}>
            <div className={style.logo}>
                <Link to={'/'}>
                <img src={Glasses} alt="" />
                <span>kino</span>
                </Link>
            </div>
        <Navbar />
        </div>
    );
};

export default Header;