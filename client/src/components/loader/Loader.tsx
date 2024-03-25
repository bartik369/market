import React from 'react';
import style from './Loader.module.css';

const Loader = () => {
    return (
        <div className={style['loader-wrap']}>
        <div className={style['lds-ring']}><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loader;