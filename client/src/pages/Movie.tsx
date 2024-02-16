import React, {FC, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import { IMovie } from '../types/media';



const Movie:FC = () => {
    const params = useParams()
    console.log('params', params)

    return (
        <div>
         movie inf
        </div>
    );
};

export default Movie;