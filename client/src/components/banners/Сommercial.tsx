import React, {FC} from 'react';
import style from './Banners.module.css'
import bannerLeft from '../../assets/pics/banner-left.png';
import bannerRight from '../../assets/pics/banner-right.png';

const Commercial:FC = () => {
    return (
        <div className={style.commercial}>
            <div className={style.item}>
                <img src={bannerLeft} alt="" />
            </div>
            <div className={style.item}>
            <img src={bannerRight} alt="" />
            </div>
        </div>
    );
};

export default Commercial;