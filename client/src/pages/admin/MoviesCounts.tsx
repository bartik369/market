import React, {FC} from 'react';
import {useGetMoviesCountQuery} from '../../store/adminApi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import style from './Admin.module.css'

const MoviesCounts: FC = () => {
    const {data: moviesCount} = useGetMoviesCountQuery();
    return (
        <div className={style.pink}>
          <div className={style.icon}>
            <FontAwesomeIcon icon={faUsers}/>
          </div>
          <div className={style.count}>
          {moviesCount} 
          </div> 
          <div className={style.title}>
            Всего фильмов
          </div>
        </div>
    );
};

export default MoviesCounts;