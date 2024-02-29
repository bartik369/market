import React, {FC} from 'react';
import { ratingMovie } from '../../utils/data/data';
import style from './Rating.module.css';

interface IRatingProps  {
    setVisibleRating: (visibleRating: boolean) => void;
    sendRating: (value: number) => void;
    visibleRating: boolean;
}

const Rating: FC<IRatingProps> = ({setVisibleRating, visibleRating, sendRating}) => {

    return (
        <div className={style.rating}>
            <div className={style.inner}>
                {ratingMovie.map((item) =>
                 <div onClick={() => sendRating(item.value)} className={style.item} key={item.id}>{item.value}</div>
                )}
            </div>
            <button onClick={() => setVisibleRating(!visibleRating)}>close</button>
        </div>
    );
};

export default Rating;