import React, {FC} from 'react';
import { IMovie } from '../../types/media';
import style from './Poster.module.css'

interface IMovieProps {
    movie: IMovie
}

const Poster: FC<IMovieProps> = ({movie}) => {
    return (
        <div className={style.poster}>
            <div className={style['prev-layer']}>
              {m}  
            </div>
            <div className={style['desc-layer']}>
            <div className={style.title}>{movie.title}</div>
            </div>
        </div>
    );
};

export default Poster;