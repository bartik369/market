import React, { FC, useState, useEffect } from "react";
import * as contentConst from "../../utils/constants/content";
import { ratingRangeData, yearMovieRageData } from "../../utils/data/data";
import { IFilterMovie, IMovie } from "../../types/media";
import style from "./MovieFilter.module.css";
import DropCategory from "../dropdown/DropCategory";
import DropCountry from "../dropdown/DropCountry";

interface IMovieFilterProps {
  setFilterData: (filterData: IFilterMovie) => void;
  filterData: IFilterMovie;
  movies: IMovie[];
}

const MovieFilter: FC<IMovieFilterProps> = ({
  setFilterData, 
  filterData,
  movies,
}) => {

  return (
    <div className={style.filter}>
      <div className={style.item}>
      <div className={style.title}>{contentConst.movieCategory}</div>
        <DropCategory/>
      </div>
      <div className={style.item}>
      <div className={style.title}>{contentConst.movieCountry}</div>
      <DropCountry/>
      </div>
      <div className={style.item}>
        <div className={style.title}>{contentConst.movieYear}</div>
        <select
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterData({ ...filterData, year: e.target.value })
          }
        >
          <option value="" disabled>
            {contentConst.select}
          </option>
          {yearMovieRageData.map((item) => (
            <option key={item.id}>{item.title}</option>
          ))}
        </select>
      </div>
      <div className={style.item}>
        <div className={style.title}>{contentConst.movieRating}</div>
        <select
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterData({ ...filterData, rating: e.target.value })
          }
        >
          <option value="" disabled>
            {contentConst.select}
          </option>
          {ratingRangeData.map((item) => (
            <option key={item.id}>{item.title}</option>
          ))}
        </select>
      </div>
      {/* <div className={style.item}><button onClick={() => setFilterData({
        ...filterData, cast: '', category: '',
      })}>сбросить</button></div> */}
    </div>
  );
};

export default MovieFilter;
