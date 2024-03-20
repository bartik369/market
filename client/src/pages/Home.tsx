import React, {FC} from 'react';
import LastMovies from '../components/sliders/LastMovies';
import MainSlider from '../components/sliders/MainSlider';
import style from './Home.module.css'

const Home: FC = () => {
    return (
       <div className={style.main}>
            <MainSlider />
           <div className={style.container}>
           <div className={style.title}>Новинки недели</div>
           <LastMovies />
           </div>
       </div>
    );
};

export default Home;