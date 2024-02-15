import React, {FC} from 'react';
import style from './Search.module.css'

const Search:FC = () => {
    return (
        <div className={style.search}>
            <input type="text" />
        </div>
    );
};

export default Search;