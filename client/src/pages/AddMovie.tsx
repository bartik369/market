import React, { FC, useState, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {createMovie, getMovies} from '../store/movieSlice'
import Poster from "../components/poster/Poster";
import { IMovie } from "../types/media";
import style from "./AddMedia.module.css";
import MovieForm from "../components/forms/MovieForm";

const AddMovie: FC = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.movies.list);
  const [movie, setMovie] = useState<IMovie>({
    _id: '',
    title: '',
    genre: '',
    year: 0,
    country: '',
    description: '',
    director: '',
    time: 0,
    actors: [],
  });

console.log(movie)

useEffect(() => {
  dispatch(getMovies());
}, [dispatch]);

const [file, setFile] = useState<string | Blob>('');
const [prevImg, setPrevImg] = useState<string | null>('');

const createActorHandler = () => {
  dispatch(createMovie(movie));
};

const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setMovie({
    ...movie, movie:[...movie.genre, e.target.value],

  });
};
const deleteGenre = (e: React.MouseEvent, item: string) => {
  e.preventDefault()
  setMovie({
    ...movie, genre: movie.genre.filter((elem) => elem !== item)
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
        deleteActors={deleteActors}
        />
      </div>

      <div className={style["r-side"]}>
        <Poster movie={movie} />
      </div>
    </div>
  );
};

export default AddMovie;
