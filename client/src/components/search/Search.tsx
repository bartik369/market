import React, {FC} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import style from './Search.module.css'

const Search:FC = () => {
    return (
        <div className={style.search}>
           <FontAwesomeIcon icon={faSearch} />
        </div>
    );
};

export default Search;