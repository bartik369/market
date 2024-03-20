import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import { getLastMovies } from "../../store/movieSlice";
import MovieItem from "../items/MovieItem";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from "../../utils/constants/content";
import ENV from "../../env.config";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import style from "./MainSlider.module.css";

const LastMovies: FC = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(state => state.movies.list)

  useEffect(() => {
    dispatch(getLastMovies())
  }, [dispatch])

  return (
    <div className={style.movies__carousel}>
      <CarouselProvider
        naturalSlideWidth={70}
        naturalSlideHeight={160}
        totalSlides={movies && movies.length + 1}
        visibleSlides={8}
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
                  <MovieItem movie={movie}/>
                  </Link>
              </Slide>
            ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default LastMovies;
