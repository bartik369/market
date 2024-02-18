import React, {FC} from 'react';
import style from './Home.module.css'

const Home: FC = () => {
    return (
       <div className={style.main}>
           <div className={style.container}>
           home page
           </div>
       </div>
    );
};

export default Home;