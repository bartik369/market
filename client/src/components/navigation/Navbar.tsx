import React, {FC} from 'react';
import style from './Navbar.module.css'
import {menuItemsData} from '../../utils/data/data'
import { Link } from 'react-router-dom';

const Navbar:FC = () => {
    console.log(menuItemsData)
    return (
        <nav className={style['header-nav']}>
            <ul className={style['menu-items']}>
                {menuItemsData.map((item) =>
                <li className={style['menu-item']} key={item.id}>
                    <Link to={item.url}>{item.title}</Link>
                </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;