import React, { FC, useState } from "react";
import ENV from "../../env.config";
import { IMovie } from "../../types/media";
import style from "./MovieItem.module.css";

interface MOvieItemProps {
  movie: IMovie;
}

const MovieItem: FC<MOvieItemProps> = ({ movie }) => {
  const [visible, setVisible] = useState(false);

  function showExtMenu() {
    setVisible(true);
  }

  return (
    <div
      className={style.wrapper}
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
    >
      <div className={style.item}>
        <img src={`${ENV.API_URL_UPLOADS_MOVIES}/${movie.picture}`} alt="" />
        <div className={visible ? style["item-info"] : style.hidden}>
            <div className={style['right-info']}>
                right
            </div>
            <div className={style['bottom-info']}>
                <div>{movie.ageCategory}</div>
                <span>{movie.country}</span>
                <span>{movie.year}</span>
            </div>
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
