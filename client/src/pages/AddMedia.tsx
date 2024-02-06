import React, { FC, useState } from "react";
import { ageItemsData, categoryMovies, yearMedia } from "../utils/data/data";
import { coutryList } from "../utils/data/coutry";
import { directorsList } from "../utils/data/directors";
import Poster from "../components/poster/Poster";
import * as contentConst from "../utils/constants/content";
import { IMovie } from "../types/media";
import style from "./AddMedia.module.css";

const AddMedia: FC = () => {
  const [movie, setMovie] = useState<IMovie>({
    id: "",
    title: "",
    category: "",
    description: "",
    year: "",
    director: "",
    country: "",
    time: 0,
    age: "",
    media: null,
  });
  //
  return (
    <div className={style.wrapper}>
      <div className={style["l-side"]}>
        <form className={style.form}>
          <label>{contentConst.movieName}</label>
          <input
            type='text'
            placeholder={contentConst.selectMovieTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({ ...movie, title: e.target.value })}
          />
          <label>{contentConst.movieDescription}</label>
          <textarea
            name=''
            placeholder={contentConst.selectMovieDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMovie({ ...movie, description: e.target.value })}
          />
          <div className={style.separate}>
            <div className={style.block}>
              <label>{contentConst.movieCountry}</label>
              <select
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setMovie({ ...movie, country: e.target.value })}
              >
                <option value="" disabled>
                  {contentConst.select}
                </option>
                {coutryList.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className={style.block}>
              <label>{contentConst.movieYear}</label>
              <select
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setMovie({ ...movie, year: e.target.value })}
              >
                <option value="" disabled>
                  {contentConst.select}
                </option>
                {yearMedia.map((item) => (
                  <option key={item.id}>{item.year}</option>
                ))}
              </select>
            </div>
            <div className={style.block}>
              <label>{contentConst.movieDirector}</label>
              <select
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setMovie({ ...movie, director: e.target.value })}
              >
                <option value="" disabled>
                  {contentConst.select}
                </option>
                {directorsList.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className={style.block}>
              <label>{contentConst.movieCategory}</label>
              <select
                defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setMovie({ ...movie, category: e.target.value })}
              >
                <option value="" disabled>
                  {contentConst.select}
                </option>
                {categoryMovies.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          <div className={style.block}>
            <label>{contentConst.movieTime}</label>
            <input
              type="text"
              placeholder={contentConst.select}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMovie({ ...movie, time: Number(e.target.value) })}
            />
          </div>
          <div className={style.block}>
            <label>{contentConst.movieAge}</label>
            <select
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setMovie({ ...movie, director: e.target.value })}
            >
              <option value="" disabled>
                {contentConst.select}
              </option>
              {ageItemsData.map((item) => (
                <option key={item.id}>{item.age}</option>
              ))}
            </select>
          </div>
          </div>
          <label className={style["select-img"]} htmlFor="mediafile-btn">
            Обложка
          </label>
          <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({ ...movie, media: e.target.files })}
            accept="file/.jpg, .jpeg, .png" id="mediafile-btn" hidden
          />
        </form>
      </div>
      <div className={style["r-side"]}>
        <Poster movie={movie} />
      </div>
    </div>
  );
};

export default AddMedia;
