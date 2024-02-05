import React, { FC, useState } from "react";
import { IMovie } from "../../types/media";
import { categoryMovies, yearMedia } from "../../utils/data/data";
import { coutryList } from "../../utils/data/coutry";
import { directorsList } from "../../utils/data/directors";
import * as contentConst from "../../utils/constants/ content";
import style from "./AddMovieForm.module.css";

const AddMovieForm: FC = () => {
  const [movie, setMovie] = useState<IMovie>({
    id: "",
    title: "",
    category: "",
    description: "",
    year: "",
    country: "",
    media: "",
  });

  return (
    <>
      <form className={style.form} action="">
        <label>{contentConst.movieName}</label>
        <input 
        type="text" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, title: e.target.value })
        }/>

        <label>{contentConst.movieCategory}</label>
        <select 
        defaultValue=""
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            setMovie({ ...movie, category: e.target.value })}>
          <option value="" disabled>
            {contentConst.movieSelectCategory}
          </option>

          {categoryMovies.map((item) => (
            <option
              key={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <label>{contentConst.movieDescription}</label>
        <textarea name="" />

        <label>{contentConst.movieSelectCoutry}</label>
        <select 
        defaultValue=""
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            setMovie({...movie, country: e.target.value})}>
          <option value="" disabled>
            {contentConst.movieCountry}
          </option>
          {coutryList.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>

        <label>{contentConst.movieYear}</label>
        <select 
        defaultValue=""
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            setMovie({...movie, country: e.target.value})}>
          <option value="" disabled>
            {contentConst.movieSelectYear}
          </option>
          {yearMedia.map((item) => (
            <option key={item.id}>{item.year}</option>
          ))}
        </select>

        <label>{contentConst.movieSelectDirector}</label>
        <select name="" id="" defaultValue="">
          <option value="" disabled>
            {contentConst.movieDirector}
          </option>
          {directorsList.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <input type="file" />
        <button></button>
      </form>
    </>
  );
};

export default AddMovieForm;
