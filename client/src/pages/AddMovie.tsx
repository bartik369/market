import React, { FC, useState, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {createMovie, getMovies} from '../store/movieSlice'
import PreviewPoster from "../components/poster/PreviewPoster";
import { IMovie } from "../types/media";
import style from "./AddMovie.module.css";
import MovieForm from "../components/forms/MovieForm";

const AddMovie: FC = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.movies.list);
  const [movie, setMovie] = useState<IMovie>({
    _id: '',
    title_en: '',
    title_ru: '',
    genre: [],
    year: '',
    country: '',
    description: '',
    director: '',
    time: '',
    actors: [],
  });

console.log(movie)

useEffect(() => {
  dispatch(getMovies());
}, [dispatch]);

const [file, setFile] = useState<string | Blob>('');
const [prevImg, setPrevImg] = useState<string | null>('');

const createMovieHandler = () => {
  dispatch(createMovie(movie));
};

const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setMovie({ 
    ...movie, genre:[...movie.genre, e.target.value] });
};

const deleteGenre = (e: React.MouseEvent, item: string) => {
  e.preventDefault()
  setMovie({
    ...movie, genre: movie.genre.filter((elem) => elem !== item)
  });
}

const addActor = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setMovie({
    ...movie, actors:[...movie.actors, e.target.value] });
};

const deleteActor = (e: React.MouseEvent, item: string) => {
  e.preventDefault()
  setMovie({
    ...movie, actors: movie.actors.filter((elem) => elem !== item)
  });
}


const imgAction = (e:React.ChangeEvent<HTMLInputElement>) => {
  e.target.files && setFile(e.target.files[0]);
  e.target.files && setPrevImg(URL.createObjectURL(e.target.files[0]))
}



  //
  return (
    <div className={style.wrapper}>
      <div className={style["l-side"]}>
        <MovieForm
        movie={movie}
        setMovie={setMovie}
        imgAction={imgAction}
        addGenre={addGenre}
        deleteGenre={deleteGenre}
        addActor={addActor}
        deleteActor={deleteActor}
        setFile={setFile}
        />
      </div>

      <div className={style["r-side"]}>
        <PreviewPoster
        prevImg={prevImg}
        movie={movie} 
        createMovieHandler={createMovieHandler}
        />
      </div>
    </div>
  );
};

export default AddMovie;
