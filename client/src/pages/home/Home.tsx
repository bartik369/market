import React, {FC} from 'react';
import Commercial from '../../components/banners/Сommercial';
import LastMovies from '../../components/sliders/LastMovies';
import TopMovies from '../../components/sliders/TopMovies';
import MainSlider from '../../components/sliders/MainSlider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faStar} from "@fortawesome/free-solid-svg-icons";
import style from './Home.module.css'

const Home: FC = () => {
  return (
    <div className={style.main}>
      <MainSlider />
      <div className={style.container}>
      <div className={style.title}>
          <FontAwesomeIcon className={style.icon} icon={faStar} />
          <span>Новинки</span>
        </div>
        <LastMovies />
        <Commercial />
        <div className={style.title}>
          <FontAwesomeIcon className={style.icon} icon={faTrophy} />
          <span>Топ-10 месяца</span>
        </div>
        <TopMovies />
      </div>
    </div>
  );
};

export default Home;
