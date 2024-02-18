import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHook";
import { getMovie } from "../store/movieSlice";
import { IMovie } from "../types/media";
import ENV from "../env.config";
import nonePoster from "../assets/pics/blank_movie.jpg";
import vignette from "../assets/pics/vignette.png";
import style from "./Movies.module.css";

const Movie: FC = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useAppDispatch();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id)).then((res) => {
        setMovie(res.payload as IMovie);
      });
    }
  }, []);

  return (
    <>
      {movie && (

        <div className={style.movie}>
          <div className={style["video-layer"]}>
            {movie.trailer && (
              <video className={style.video} src={`${ENV.API_URL_UPLOADS_MOVIES}${movie.trailer}`}
              autoPlay muted loop></video>
            )}

            <div className={style.inner}>
              <div className={style.poster}>
                <img
                  src={
                    movie.picture
                      ? `${ENV.API_URL_UPLOADS_MOVIES}${movie.picture}`
                      : nonePoster
                  }
                  alt=""
                />
              </div>
              <div className={style.info}>
                <div className={style["title-ru"]}>{movie.titleRu}</div>
                <div className={style["title-en"]}>{movie.titleEn}</div>
                <div className={style.description}>{movie.description}</div>
                <div className={style["ext-info"]}>

                  <div className={style.sub}>{movie.year}</div>
                  <div className={style.sub}>{movie.country}</div>
                  <div className={style.sub}>{movie.time}</div>
                  </div>
                  <div className={style["ext-info"]}>
                  <div className={style.category}>
                    {movie.genre.map((item) => (
                      <div className={style.item}>{item}</div>
                    ))}
                  </div>
                  </div>
                  <div className={style.age}>{movie.ageCategory}</div>

                <div className={style.action}>
                  <button className={style.watch}>Смотреть</button>
                </div>
                <div className={style.cast}>
                  {movie.actors.map((item) => 
                  <div>{item}</div>
                  )}
                </div>
              </div>
            </div>
            <img className={style.vignette} src={vignette} alt="" />
          </div>
         
        </div>

      )}
    </>
  );
};

export default Movie;
