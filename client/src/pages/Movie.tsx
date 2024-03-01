import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getMovie } from "../store/movieSlice";
import { getMovieActors } from "../store/actorSlice";
import { setRating } from "../store/movieSlice";
import { IMovie, IMovieRatind } from "../types/media";
import ENV from "../env.config";
import nonePoster from "../assets/pics/blank_movie.jpg";
import vignette from "../assets/pics/vignette.png";
import cinema from "../assets/pics/cinema.jpg";
import style from "./Movies.module.css";
import Rating from "../components/rating/Rating";

const Movie: FC = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.list);
  const [movie, setMovie] = useState<IMovie>();
  const [visibleRating, setVisibleRating] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id)).then((res) => {
        setMovie(res.payload as IMovie);
      });
    }
  }, []);
  console.log("movie page");

  useEffect(() => {
    if (movie) {
      dispatch(getMovieActors(movie.actors));
    }
  }, [movie]);

  const sendRating = (value: number) => {
    if (movie) {
      const ratingData: IMovieRatind = {
        id: movie?._id!,
        value: value,
      };
      dispatch(setRating(ratingData)).unwrap();
    }
  };

  return (
    <>
      {visibleRating && (
        <Rating
          setVisibleRating={setVisibleRating}
          visibleRating={visibleRating}
          sendRating={sendRating}
          movie={movie as IMovie}
        />
      )}
      {movie ? (
        <div className={style.movie}>
          <div className={style["video-layer"]}>
            {movie.trailer ? (
              <video
                className={style.video}
                src={`${ENV.API_URL_UPLOADS_MOVIES}${movie.trailer}`}
                autoPlay
                muted
                loop
              ></video>
            ) : (
              <img className={style.cinema} src={cinema} />
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
                <div className={style.description}>{movie.description}</div>

                <div className={style.action}>
                  <div className={style.watch}>Смотреть</div>
                  <div className={style['movie-rating']} onClick={() => setVisibleRating(true)}>
                    <div className={style.number}>{movie.rating}</div>
                    <div className={style.vote}>
                      Оценить
                    </div>
                  </div>
                </div>

                <div className={style.cast}>
                  {actors.map((item) => (
                    <div className={style.item2}>
                      <div className={style.portrait}>
                        <img
                          src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`}
                          alt=""
                        />
                      </div>
                      <div className={style.name}>
                        <div>{item.nameRu}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <img className={style.vignette} src={vignette} alt="" />
          </div>
        </div>
      ) : (
        <span className={style.loading}>Loading.....</span>
      )}
    </>
  );
};

export default Movie;
