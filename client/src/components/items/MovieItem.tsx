import React, { FC } from "react";
import ENV from "../../env.config";
import { IMovie } from "../../types/media";
import style from "./MovieItem.module.css";

interface MOvieItemProps {
  movie: IMovie;
}

const MovieItem: FC<MOvieItemProps> = ({ movie }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.item}>
        <img src={`${ENV.API_URL_UPLOADS_MOVIES}/${movie.picture}`} alt="" />
        <div className={style["item-info"]}>
         
        </div>
      </div>
      <div className={style.title}>
        <div className={style.ru}>{movie.titleRu}</div>
        <div className={style.en}> {movie.titleEn}</div>
      </div>
    </div>
  );
};

export default MovieItem;
