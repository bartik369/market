import React, { FC, useState, useEffect } from "react";
import * as contentConst from "../../utils/constants/content";
import { categoryMovies } from "../../utils/data/data";
import {coutryList} from '../../utils/data/coutry'
import { ratingRangeData, yearMovieRageData } from "../../utils/data/data";
import { IFilterMovie, IMovie } from "../../types/media";
import style from "./MovieFilter.module.css";
import DropCategory from "../../hooks/dropdown/DropCategory";

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
        <DropCategory setFilterData={setFilterData} filterData={filterData} />
      </div>
      <div className={style.item}>
        <div className={style.title}>{contentConst.movieCountry}</div>
        <select
          defaultValue=""
          // onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          //   setFilterData({ ...filterData, cast: e.target.value })
          // }
        >
          <option value="" disabled>
            {contentConst.select}
          </option>
          {coutryList.map((item) => (
            <option>{item.name}</option>
          ))}
        </select>
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
