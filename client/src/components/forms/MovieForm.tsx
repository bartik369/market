import { RecordWithTtl } from "dns";
import React, { FC } from "react";
import { IMovie } from "../../types/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";
import { ageItemsData, categoryMovies, yearMedia } from "../../utils/data/data";
import { coutryList } from "../../utils/data/coutry";
import { actorsList } from "../../utils/data/actors";
import { directorsList } from "../../utils/data/directors";
import * as contentConst from "../../utils/constants/content";
import style from "./AddItemForm.module.css";

interface IMovieProps {
  movie: IMovie;
  setMovie: (movie: IMovie) => void;
  imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deleteGenre: (e: React.MouseEvent, item: string) => void;
  addActor: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deleteActor: (e: React.MouseEvent, item: string) => void;
  setFile: (file: string | Blob) => void;
}

const MovieForm: FC<IMovieProps> = ({
  movie,
  setMovie,
  imgAction,
  addGenre,
  deleteGenre,
  addActor,
  deleteActor,
}) => {
  return (
    <form className={style.form}>
       <div className={style["main-column"]}>
      <div className={style.column2}>
        <span className={style['input-info']}>{contentConst.movieNameRu}</span>
        <input
          type="text"
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, titleRu: e.target.value })
          }
        />
      </div>

      <div className={style.column2}>
        <span className={style['input-info']}>{contentConst.movieNameEn}</span>
        <input
          type="text"
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMovie({ ...movie, titleEn: e.target.value })
          }
        />
      </div>
      </div>
      <div className={style["main-column"]}>
        <div className={style.column3}>
          <span className={style['input-info']}>{contentConst.movieYear}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, year: e.target.value })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {yearMedia.map((item) => (
              <option key={item.id}>{item.year}</option>
            ))}
          </select>
        </div>

        <div className={style.column3}>
          <span className={style['input-info']}>{contentConst.movieCountry}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, country: e.target.value })
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

        <div className={style.column3}>
          <span className={style['input-info']}>{contentConst.movieTime}</span>
          <input
            type="text"
            placeholder={contentConst.fill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMovie({ ...movie, time: e.target.value })
            }
          />
        </div>
      </div>

      <div className={style.block}>
        <span className={style['input-info']}>{contentConst.movieDescription}</span>
        <textarea
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMovie({ ...movie, description: e.target.value })
          }
        />
      </div>

      <div className={style["main-column"]}>
        <div className={style.column2}>
          <span className={style['input-info']}>{contentConst.movieCategory}</span>
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
          <span className={style['input-info']}>{contentConst.movieDirector}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMovie({ ...movie, director: e.target.value })
            }
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {directorsList.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
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

      <div className={style["main-column"]}>
        <div className={style.column2}>
          <span className={style['input-info']}>{contentConst.movieCast}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addActor(e)}
          >
            <option value="" disabled>
              {contentConst.select}
            </option>
            {actorsList.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className={style.column2}>
          <span className={style['input-info']}>{contentConst.actorPhoto}</span>
          <label className={style["photo-layer"]} htmlFor={"upload"}>
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
              imgAction(e);
            }}
          />
        </div>
      </div>
      <div className={style.genre}>
        {movie.actors.map((item) => (
          <div className={style.item}>
            {item}
            <FontAwesomeIcon
              className={style["close-btn"]}
              onClick={(e: React.MouseEvent) => deleteActor(e, item)}
              icon={faXmark}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default MovieForm;
