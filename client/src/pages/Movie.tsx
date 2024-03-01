import React, { FC, useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getMovie, addFavorite } from "../store/movieSlice";
import { getMovieActors } from "../store/actorSlice";
import { setRating } from "../store/movieSlice";
import { IMovie, IMovieRatind, IMovieAddFavorite } from "../types/media";
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
  const user = useAppSelector((state) => state.auth.user);
  const [movie, setMovie] = useState<IMovie>();
  const [visibleRating, setVisibleRating] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(getMovie(id)).then((res) => {
        setMovie(res.payload as IMovie);
      });
    }
  }, []);

  useEffect(() => {
    if (movie) {
      dispatch(getMovieActors(movie.actors));
    }
  }, [movie]);

  const ratingHandler = async (value: number) => {
    if (movie) {
      const ratingData: IMovieRatind = {
        id: movie?._id!,
        value: value,
      };
      await dispatch(setRating(ratingData)).then((res) => {
        console.log(res);
      });
    }
  };
  const favoriteHandler = async (_id: string) => {
    const favoriteData: IMovieAddFavorite = {
      userId: user?._id,
      movieId: movie?._id!,
    };
    dispatch(addFavorite(favoriteData)).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      {visibleRating && (
        <Rating
          setVisibleRating={setVisibleRating}
          visibleRating={visibleRating}
          ratingHandler={ratingHandler}
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
            <img className={style.vignette} src={vignette} alt="" />
          </div>

          <div className={style.inner}>
            <div className={style.poster}>
              <img alt="" src={ movie.picture
                    ? `${ENV.API_URL_UPLOADS_MOVIES}${movie.picture}`
                    : nonePoster
                }
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
                <div
                  className={style["movie-rating"]}
                  onClick={() => setVisibleRating(true)}
                >
                  <div className={style.number}>{movie.rating}</div>
                  <div className={style.vote}>Оценить</div>
                </div>
                <div className={style.favorite}>
                  <button onClick={() => favoriteHandler(movie._id as string)}>
                    add favotite
                  </button>
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
        </div>
      ) : (
        <span className={style.loading}>Loading.....</span>
      )}
    </>
  );
};

export default Movie;
