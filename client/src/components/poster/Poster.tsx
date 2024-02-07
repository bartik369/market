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
                
            </div>
            <div className={style['desc-layer']}>
            <div className={style.title}></div>
            </div>
        </div>
    );
};

export default Poster;