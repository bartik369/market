import React from 'react';
import style from './MovieFilter.module.css'

const MovieFilter = () => {
    return (
        <div className={style.filter}>
            <div className={style.item}>
                <span>Category</span>
                <input type="text" />
            </div>
            <div className={style.item}>
                <span>Roles</span>
                <input type="text" />
            </div>
            <div className={style.item}>
                <span>year</span> 
                <input type="text" />
            </div>
            <div className={style.item}>
                <span>Category</span>
                <input type="text" />
            </div>
        </div>
    );
};

export default MovieFilter;