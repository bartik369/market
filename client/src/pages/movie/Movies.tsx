import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { getMovies } from '../../store/movieSlice';
import { getFavorites } from '../../store/movieSlice';
import MovieItem from '../../components/items/MovieItem';
import MovieFilter from '../../components/filter/MovieFilter';
import Loader from '../../components/loader/Loader';
import ENV from '../../env.config';
import style from './Movies.module.css';

const Movies = () => {
  const movies = useAppSelector((state) => state.movies.list);
  const filter = useAppSelector((state) => state.movies.filter);
  const user = useAppSelector((state) => state.auth.user);
  const favorites = useAppSelector((state) => state.movies.favorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies(filter));
    user && dispatch(getFavorites({ id: user._id }));
  }, [dispatch, filter, user]);

  return (
    <div className={style.container}>
      <MovieFilter />
      <div className={style.movies}>
        {movies.length > 0 && (
          movies.map((movie) => (
            <div key={movie._id}>
              <Link to={`${ENV.MOVIES}${movie._id}`}>
                <MovieItem movie={movie} favorites={favorites} />
              </Link>
            </div>
          ))
        )}
      </div>
      {!movies.length && <Loader />}
    </div>
  );
};

export default Movies;
