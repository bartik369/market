import React, {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { ratingMovie } from '../../utils/data/data';
import { IMovie } from '../../types/media';
import style from './Rating.module.css';

interface IRatingProps  {
    setVisibleRating: (visibleRating: boolean) => void;
    ratingHandler: (value: number) => void;
    visibleRating: boolean;
    movie: IMovie;
}

const Rating: FC<IRatingProps> = ({
    setVisibleRating, 
    visibleRating, 
    ratingHandler,
    movie,
}) => {

    return (
        <div className={style.rating}>
            <div className={style.inner}>
                <div className={style.ru}>{movie.titleRu}</div>
                <div className={style.en}>{movie.titleEn}</div>
                <div className={style.numbers}>
                {ratingMovie.map((item) =>
                 <div onClick={() => ratingHandler(item.value)} className={style.item} key={item.id}>{item.value}</div>
                )}
                </div>
            </div>
            <button className={style.close} onClick={() => setVisibleRating(!visibleRating)}>
            <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

export default Rating;