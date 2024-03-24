import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { footerMenu1, footerMenu2 } from '../../utils/data/data';
import style from './Footer.module.css';

const Footer: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.menu}>
          <ul>
            {footerMenu1.map((item) => (
              <li key={item.id}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.menu}>
          <ul>
            {footerMenu2.map((item) => (
              <li key={item.id}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.menu}></div>
        <div className={style.info}>there is something</div>
      </div>
    </div>
  );
};

export default Footer;
