import React, { FC } from "react";
import {IMovie } from "../../types/media";
import style from "./MovieFilter.module.css";
import DropCategory from "../dropdown/DropCategory";
import DropCountry from "../dropdown/DropCountry";
import DropYear from "../dropdown/DropYear";
import DropRating from "../dropdown/DropRating";

interface IMovieFilterProps {
  movies: IMovie[];
}

const MovieFilter: FC<IMovieFilterProps> = ({
  movies,
}) => {

  return (
    <div className={style.filter}>
      <div className={style.item}>
        <DropCategory/>
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
      {/* <div className={style.item}><button onClick={() => setFilterData({
        ...filterData, cast: '', category: '',
      })}>сбросить</button></div> */}
    </div>
  );
};

export default MovieFilter;
