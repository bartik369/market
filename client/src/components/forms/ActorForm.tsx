import React, { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";
import { categoryMovies, genderItemsData } from "../../utils/data/data";
import * as contentConst from "../../utils/constants/content";
import { coutryList } from "../../utils/data/coutry";
import { actorsList } from "../../utils/data/actors";
import style from "./AddItemForm.module.css";
import { IActor } from "../../types/media";

interface IActorProps {
  actor: IActor;
  setActor: (actor: IActor) => void;
  imgAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteGenre: (e: React.MouseEvent, item: string) => void;
  setFile: (file: string | Blob) => void;
  addGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ActorForm: FC<IActorProps> = ({
  actor,
  setActor,
  imgAction,
  deleteGenre,
  addGenre,
  }) => {
  return (
    <form className={style.form}>
      <div className={style.block}>
        <span>{contentConst.actorNameRu}</span>
        <input
          type="text"
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setActor({ ...actor, name_ru: e.target.value })
          }
        />
      </div>
      <div className={style.block}>
        <span>{contentConst.actorNameEn}</span>
        <input
          type="text"
          placeholder={contentConst.fill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setActor({ ...actor, name_en: e.target.value })
          }
        />
      </div>
      <div className={style["main-column"]}>
        <div className={style.column2}>
          <span>{contentConst.actorCountry}</span>
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
          <span>{contentConst.actorCity}</span>
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

        <div className={style.column3}>
          <span>{contentConst.actorBirthday}</span>
          <DatePicker
            selected={new Date(actor.extInfo.birthday)}
            // onSelect={handleDateSelect} //when day is clicked
            onChange={(date: Date) => {
              if (date !== null) {
                setActor({
                  ...actor,
                  extInfo: {
                    ...actor.extInfo,
                    birthday: date.getTime()
                  },
                })
              }
            }
            }
          />
          {/* <input
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
          /> */}
        </div>
        
        <div className={style.column3}>
          <span>{contentConst.actorHeight}</span>
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
        <div className={style.column2}>
          <span>{contentConst.actorGender}</span>
          <select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setActor({
                ...actor,
                extInfo: {
                  ...actor.extInfo,
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
            <label className={style["select-photo"]}>
              {contentConst.actorSelectPhoto}
            </label>
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
        {actor.extInfo.genre.map((item) => (
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

export default ActorForm;
