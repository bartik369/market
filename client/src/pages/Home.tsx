import React, {FC} from 'react';
import LastMovies from '../components/sliders/LastMovies';
import MainSlider from '../components/sliders/MainSlider';
import style from './Home.module.css'

const Home: FC = () => {
    return (
       <div className={style.main}>
           <div className={style.container}>
           <MainSlider />
           <LastMovies />
           </div>
       </div>
    );
};

export default Home;