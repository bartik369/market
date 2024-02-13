import React, { FC } from "react";
import { IMovie } from "../../types/media";
import * as contentConst from "../../utils/constants/content";
import BlankAvatar from "../../assets/pics/blank_avatar.jpg";
import style from "./PreviewPoster.module.css";

interface IPreviewPosterProps {
  prevImg: string | null;
  movie: IMovie;
  createMovieHandler: () => void;
}

const PreviewPoster: FC<IPreviewPosterProps> = ({
  prevImg,
  movie,
  createMovieHandler,
}) => {
  return (
    <div className={style.wrapper}>

      <div className={style.portrait}>
        {prevImg ? <img src={prevImg} alt="" /> : <img src={BlankAvatar} />}
      </div>

      <div className={style.info}>

        <div className={style.name}>
          <span className={style.ru}>{movie?.title_ru}</span>
          <span className={style.en}>{movie?.title_en}</span>
        </div>

        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieYear}</span>
          {movie.year 
          ? movie.year 
          : <span className={style.nf}>{contentConst.notFilled}</span>}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieCountry}</span>
          {movie.country 
          ? movie.country 
          : <span className={style.nf}>{contentConst.notFilled}</span>}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieTime}</span>
          {movie.time 
          ? movie.time 
          : <span className={style.nf}>{contentConst.notFilled}</span>}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieDirector}</span>
          {movie.director 
          ? movie.director 
          : <span className={style.nf}>{contentConst.notFilled}</span>}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieDescription}</span>
          {movie.description 
          ? movie.description 
          : <span className={style.nf}>{contentConst.notFilled}</span>}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieCategory}</span>
          <div className={style['genre-column']}>
              {movie.genre.length
              ? movie.genre.map((item) => 
              <div>{item}</div>)
              :<span className={style.nf}>{contentConst.notFilled}</span>
              }
        </div>
        </div>

        <div className={style.result}>
          <span className={style.prevText}>{contentConst.movieCast}</span>
          <div className={style['genre-column']}>
              {movie.actors.length
              ? movie.actors.map((item) => 
              <div>{item}</div>)
              :<span className={style.nf}>{contentConst.notFilled}</span>
              }
        </div>
        </div>

        <button
          className={style["btn-submit"]}
          onClick={() => createMovieHandler()}
        >
          {contentConst.addBtn}
        </button>
      </div>
    </div>
  );
};

export default PreviewPoster;
