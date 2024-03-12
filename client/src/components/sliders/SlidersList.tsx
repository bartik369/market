import React, {FC} from 'react';
import { useGetSlidesQuery } from '../../store/adminApi';
import ENV from '../../env.config';
import style from './SlidersList.module.css'

const SlidersList:FC = () => {
    const {data: slides} = useGetSlidesQuery()
    return (
        <div className={style['slides-wrapper']}>
            {slides && slides.map((slide) => (
                <div className={style.info} key={slide._id}>
                    <div className={style.poster}>
                       <img src={`${ENV.API_URL_UPLOADS_MAIN_SLIDER}${slide.media}`} alt="" />
                    </div>
                    <div className={style.actions}>
                    <div className={style.btns}>
                        <button className={style.update}>Update</button>
                        <button className={style.delete}>Delete</button>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SlidersList;