import React from 'react';
import { FC } from 'react';
import {Routes, Route} from 'react-router-dom'
import style from './App.module.css'
import Home from './pages/Home';

const App: FC = () => {
  return (
    <div className={style.wrapper}>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
};

export default App;
