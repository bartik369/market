import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { getMovies } from '../store/movieSlice';
import Movie from './Movie';
import CategoryMovies from '../components/sort/CategoryMovies';
import style from './Movies.module.css';
import MovieItem from '../components/items/MovieItem';
import MovieFilter from '../components/filter/MovieFilter';

const Movies = () => {
    const movies = useAppSelector((state) => state.movies.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch]);

    return (
        <div className={style.container}>
        <MovieFilter />
        <div className={style.movies}>
            {/* <CategoryMovies /> */}
            {movies.map((movie) =>
            <div key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
                <MovieItem movie={movie} />
            </Link>
            </div>
            )}
        </div>
        </div>
    );
};

export default Movies;