import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCamera } from "@fortawesome/free-solid-svg-icons";
import { categoryMovies } from "../../utils/data/data";
import * as contentConst from "../../utils/constants/content";
import { coutryList } from "../../utils/data/coutry";
import style from "./ActorForm.module.css";
import { IActor } from "../../types/media";

interface IActorProps {
  actor: IActor;
  setActor: (actor: IActor) => void;
  createActorHandler: () => void;
  deleteGenre: (e: React.MouseEvent, item: string) => void;
  setFile: (file: string | Blob) => void;
  addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ActorForm: FC<IActorProps> = ({
  actor,
  setActor,
  deleteGenre,
  addGenre,
  setFile,
  createActorHandler,
}) => {
  return (
      <form className={style.form}>
        
          <div className={style.block}>
            <label>{contentConst.actorNameEn}</label>
            <input
              type="text"
              placeholder={contentConst.fill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({ ...actor, name_en: e.target.value })
              }
            />
          </div>
          <div className={style.block}>
            <label>{contentConst.actorNameRu}</label>
            <input
              type="text"
              placeholder={contentConst.fill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({ ...actor, name_ru: e.target.value })
              }
            />
         
        </div>
        <div className={style["main-column"]}>
          <div className={style.column2}>
            <label>{contentConst.actorCountry}</label>
            <select
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setActor({
                  ...actor,
                  extInfo: {
                    ...actor.extInfo,
                    country: e.target.value,
                  },
                })
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
          <div className={style.column2}>
            <label>{contentConst.actorCity}</label>
            <input
              type="text"
              placeholder={contentConst.fill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({
                  ...actor,
                  extInfo: {
                    ...actor.extInfo,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className={style["main-column"]}>
          <div className={style.column2}>
            <label>{contentConst.actorBirthday}</label>
            <input
              placeholder={contentConst.fill}
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({
                  ...actor,
                  extInfo: {
                    ...actor.extInfo,
                    birthday: e.target.value,
                  },
                })
              }
            />
            <div></div>
          </div>
          <div className={style.column2}>
            <label>{contentConst.actorHeight}</label>
            <input
              type="text"
              placeholder={contentConst.fill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({
                  ...actor,
                  extInfo: {
                    ...actor.extInfo,
                    height: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className={style["main-column"]}>
          <div className={style.column2}>
            <label>{contentConst.actorGenre}</label>
            <select
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                addGenre(e)
              }
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
            <label>{contentConst.actorPhoto}</label>
            <div className={style["photo-layer"]}>
              <FontAwesomeIcon
                className={style["photo-icon"]}
                icon={faCamera}
              />
              <label className={style["select-photo"]} htmlFor="upload">
                {contentConst.actorSelectPhoto}
              </label>
            </div>
            <input
              name="file"
              id="upload"
              type="file"
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className={style.genre}>
          {actor.extInfo.genre.map((item) => (
            <div className={style.item}>
              {item}
              <FontAwesomeIcon
                className={style["close-btn"]}
                onClick={(e: React.MouseEvent) => deleteGenre(e, item)}
                icon={faCircleXmark}
              />
            </div>
          ))}
        </div>
      </form>
  );
};

export default ActorForm;
