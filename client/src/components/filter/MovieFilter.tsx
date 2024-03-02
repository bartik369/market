import React, { FC, useState, useEffect } from "react";
import * as contentConst from "../../utils/constants/content";
import { ratingRangeData, yearMovieRageData } from "../../utils/data/data";
import { getActors } from "../../store/actorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { IFilterMovie } from "../../types/media";
import style from "./MovieFilter.module.css";

const MovieFilter: FC = () => {
  const [filterData, setFilterData] = useState<IFilterMovie>({
    category: "",
    cast: "",
    year: "",
    rating: "",
  });
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.list);
  
  useEffect(() => {
    dispatch(getActors())
  }, [])

  return (
    <div className={style.filter}>
      <div className={style.item}>
        <div className={style.title}>{contentConst.movieCategory}</div>
        <input type="text" />
      </div>
      <div className={style.item}>
        <div className={style.title}>{contentConst.movieCast}</div>
        <select
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilterData({ ...filterData, cast: e.target.value })
          }
        >
          <option value="" disabled>
            {contentConst.select}
          </option>
          {actors.map((item) => (
            <option key={item._id}>{item.nameRu}</option>
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
    </div>
  );
};

export default MovieFilter;
