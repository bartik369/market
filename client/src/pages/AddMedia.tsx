import React, {FC, useState} from 'react';
import AddMovieForm from '../components/forms/AddMovieForm';
import { IMovie } from '../types/media';
import style from './AddMedia.module.css'

const AddMedia: FC = () => {


    return (
        <div className={style.wrapper}>
            <AddMovieForm />
        </div>
    );
};

export default AddMedia;