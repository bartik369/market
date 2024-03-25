import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import DropCategory from '../dropdown/DropCategory';
import DropCountry from '../dropdown/DropCountry';
import DropYear from '../dropdown/DropYear';
import DropRating from '../dropdown/DropRating';
import {getProperties} from '../../store/movieSlice';
import style from './MovieFilter.module.css';

const MovieFilter: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProperties())
  }, [])

  return (
    <div className={style.filter}>
      <div className={style.item}>
        <DropCategory />
      </div>
      <div className={style.item}>
      <DropCountry/>
      </div>
      <div className={style.item}>
       <DropYear />
      </div>
      <div className={style.item}>
        <DropRating />
      </div>
    </div>
  );
};

export default MovieFilter;
