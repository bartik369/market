import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { getMovies } from '../store/movieSlice';
import CategoryMovies from '../components/sort/CategoryMovies';
import style from './Movies.module.css';

const Movies = () => {
    const movies = useAppSelector((state) => state.movies.list);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch]);

    console.log(movies)

    return (
        <div>
            <CategoryMovies />
            {movies.map((movie) =>
            <div>
            <Link to={`/movies/${movie._id}`}>
             <div className={style.item}>
              <p>{movie.titleRu}</p>
              <p>{movie.titleEn}</p>
              <p>{movie.country}</p>
              <p>{movie.year}</p>
            </div>
            </Link>
            </div>
            )}
        </div>
    );
};

export default Movies;