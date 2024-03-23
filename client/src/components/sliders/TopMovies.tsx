import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { getTopMovies } from "../../store/movieSlice";
import { getFavorites } from "../../store/movieSlice";
import MovieItem from "../items/MovieItem";
import useWindowSizeHook from '../../hooks/windowSizeHook';
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import style from "./MainSlider.module.css";

const TopMovies: FC = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(state => state.movies.top);
  const user = useAppSelector(state => state.auth.user);
  const favorites = useAppSelector(state => state.movies.favorites);
  const slidesCount = useWindowSizeHook();

  useEffect(() => {
    dispatch(getTopMovies());
    dispatch(getFavorites({id: user?._id}));
  }, [dispatch, user])

  return (
    <div className={style.movies__carousel}>
      <CarouselProvider
        naturalSlideWidth={70}
        naturalSlideHeight={160}
        totalSlides={movies && movies.length + 1}
        visibleSlides={slidesCount}
        currentSlide={0}
        isPlaying={true}
        interval={6000}
        infinite={true}
      >
        <ButtonBack className={style.btn_prev}>
          <FontAwesomeIcon className={style.chevron} icon={faChevronLeft} />
        </ButtonBack>
        <ButtonNext className={style.btn_next}>
          <FontAwesomeIcon className={style.chevron} icon={faChevronRight} />
        </ButtonNext>

        <Slider className={style.movies__slider}>
          {movies &&
            movies.map((movie) => (
              <Slide
                key={movie._id}
                className={style["carousel__inner"]}
                index={0}>
                   <Link to={`/movies/${movie._id}`}>
                  <MovieItem movie={movie} favorites={favorites}/>
                  </Link>
              </Slide>
            ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default TopMovies;
