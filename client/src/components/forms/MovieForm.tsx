import { RecordWithTtl } from 'dns';
import React, {FC} from 'react';
import {IMovie} from '../../types/media'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";
import { ageItemsData, categoryMovies, yearMedia } from "../../utils/data/data";
import { coutryList } from "../../utils/data/coutry";
import { directorsList } from "../../utils/data/directors";
import * as contentConst from "../../utils/constants/content";
import style from "./AddItemForm.module.css";

interface IMovieProps {
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
    imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addGenre: (e: React.ChangeEvent<HTMLInputElement>) => void,
    deleteGenre: (e:React.MouseEvent, item: string) => void;
    addActor: (e: React.ChangeEvent<HTMLInputElement>) => void,
    deleteActors: (e:React.MouseEvent, item: string) => void;
    setFile: (file: string | Blob) => void;
}

const MovieForm:FC<IMovieProps> = ({
    movie, 
    setMovie, 
    imgAction, 
    addGenre, 
    deleteGenre, 
    addActor, 
    deleteActors,
}) => {
    return (
     <form className={style.form}>
      <div className={style.block}>
        <span>{contentConst.actorNameRu}</span>
        <input
          type="text"
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, title: e.target.value })
          }
        />
      </div>

      <div className={style.block}>
        <span>{contentConst.actorNameEn}</span>
        <input
          type="text"
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, : e.target.value })
          }
        />
      </div>

      <div className={style["main-column"]}>

         <div className={style.block}>
          <span>{contentConst.actorCountry}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({...movie, country: e.target.value})
            }
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
          <span>{contentConst.actorCity}</span>
          <input
            type="text"
            placeholder={contentConst.fill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({
                ...movie,
                extInfo: {
                  ...movie.extInfo,
                  city: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
      <div className={style["main-column"]}>

        <div className={style.column3}>
          <span>{contentConst.actorBirthday}</span>
          block
        </div>
        
        <div className={style.column3}>
          <span>{contentConst.actorHeight}</span>
          <input
            type="text"
            placeholder={contentConst.fill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({
                ...movie,
                extInfo: {
                  ...movie.extInfo,
                  height: e.target.value,
                },
              })
            }
          />
        </div>
        <div className={style.column2}>
          <span>{contentConst.actorGender}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({
                ...movie,
                extInfo: {
                  ...movie.extInfo,
                  gender: e.target.value,
                },
              })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {genderItemsData.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={style["main-column"]}>
        <div className={style.column2}>
          <span>{contentConst.actorGenre}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addGenre(e)}
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {categoryMovies.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className={style.column2}>
          <span>{contentConst.actorPhoto}</span>
          <label className={style["photo-layer"]} htmlFor={'upload'}>
            <FontAwesomeIcon className={style["photo-icon"]} icon={faCamera} />
            <span className={style["select-photo"]}>
              {contentConst.actorSelectPhoto}
            </span>
          </label>
          <input
            name="file"
            id="upload"
            type="file"
            hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              imgAction(e)
            }}
          />
        </div>
      </div>
      <div className={style.genre}>
        {movie.genre.map((item) => (
          <div className={style.item}>
            {item}
            <FontAwesomeIcon
              className={style["close-btn"]}
              onClick={(e: React.MouseEvent) => deleteGenre(e, item)}
              icon={faXmark}
            />
          </div>
        ))}
      </div>
    </form>
    );
};

export default MovieForm;