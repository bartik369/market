import React, { FC, useState } from "react";
import { categoryMovies, yearMedia } from "../utils/data/data";
import { coutryList } from "../utils/data/coutry";
import { directorsList } from "../utils/data/directors";
import Poster from "../components/poster/Poster";
import * as contentConst from "../utils/constants/content";
import { IMovie } from "../types/media";
import style from "./AddMedia.module.css";

const AddMedia: FC = () => {
  const [movie, setMovie] = useState<IMovie>({
    id: '',
    title: '',
    category: '',
    description: '',
    year: '',
    director: '',
    country: '',
    media: null,
  });
  //
  return (
    <div className={style.wrapper}>
      <form className={style.form} action="">
        <label>{contentConst.movieName}</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, title: e.target.value })
          }
        />

        <label>{contentConst.movieCategory}</label>
        <select
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setMovie({ ...movie, category: e.target.value })
          }
        >
          <option value="" disabled>
            {contentConst.movieSelectCategory}
          </option>

          {categoryMovies.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>

        <label>{contentConst.movieDescription}</label>
        <textarea name=""
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) =>
            setMovie({...movie, description: e.target.value})} />

        <div className={style.separate}>
          <div className={style.country}>
            <label>{contentConst.movieCountry}</label>
            <select
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setMovie({ ...movie, country: e.target.value })
              }
            >
              <option value="" disabled>
                {contentConst.movieSelectCoutry}
              </option>
              {coutryList.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className={style.year}>
            <label>{contentConst.movieYear}</label>
            <select
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setMovie({ ...movie, year: e.target.value })
              }
            >
              <option value="" disabled>
                {contentConst.movieSelectYear}
              </option>
              {yearMedia.map((item) => (
                <option key={item.id}>{item.year}</option>
              ))}
            </select>
          </div>
          <div className={style.director}>
            <label>{contentConst.movieDirector}</label>
            <select
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setMovie({ ...movie, director: e.target.value })
              }
            >
              <option value="" disabled>
                {contentConst.movieSelectDirector}
              </option>
              {directorsList.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <label className={style["select-img"]} htmlFor="mediafile-btn">
          Обложка
        </label>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, media: e.target.files })
          }
          accept="file/.jpg, .jpeg, .png"
          id="mediafile-btn"
          hidden
        />
      </form>

      <Poster movie={movie} />
    </div>
  );
};

export default AddMedia;
