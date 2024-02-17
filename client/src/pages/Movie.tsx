import React, {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import { getMovie } from '../store/movieSlice';
import { IMovie } from '../types/media';



const Movie:FC = () => {
    const params = useParams()
    const {id} = params
    const dispatch = useAppDispatch();
    const [movie, setMovie] = useState<IMovie>()

    useEffect(() => {
        
        if (id) {
            dispatch(getMovie(id)).then((res) => {
                setMovie((res.payload) as IMovie)
            })
        }
    }, [dispatch])


    return (
        <div>
            {movie &&
            <div>{movie.country}</div>
            }
        </div>
    );
};

export default Movie;