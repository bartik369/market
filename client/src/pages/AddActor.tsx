import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { categoryMovies } from "../utils/data/data";
import * as contentConst from "../utils/constants/content";
import { coutryList } from "../utils/data/coutry";
import { addActor, getActors } from "../store/actorSlice";
import { IActor } from "../types/media";
import style from "./AddActor.module.css";

const AddActor: FC = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.list);
  const [actor, setActor] = useState<IActor>({
    _id: "",
    name_en: "",
    name_ru: "",
    picture: "",
    extInfo: {
      birthday: "",
      country: "",
      city: "",
      height: "",
      genre: [],
    },
  });

  useEffect(() => {
    dispatch(getActors());
  }, [dispatch]);

  const [file, setFile] = useState<string | Blob>("");
  const [prevImg, setPrevImg] = useState<string>("");

  const createActorHandle = () => {
    const formData = new FormData();
    type actorKey = keyof typeof actor._id;
    type actorSubKey = keyof typeof actor._id;

    Object.keys(actor).forEach((key) => {
      if (key === "extInfo") {
        Object.keys(actor[key]).forEach((subKey) => {
          formData.append(subKey, actor[key][subKey as actorSubKey]);
        });
      } else {
        formData.append(key, actor[key as actorKey]);
      }
    });
    formData.append("file", file);
    dispatch(addActor(formData));
  };

  const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActor({
      ...actor,
      extInfo: {
        ...actor.extInfo,
        genre: [...actor.extInfo.genre, e.target.value],
      },
    });
  };

  const deleteGenre = (e: React.MouseEvent, item: string) => {
      e.preventDefault()
      setActor({
        ...actor,
        extInfo: {
          ...actor.extInfo,
          genre: actor.extInfo.genre.filter((elem) => elem !== item)
        },
      });
  }

  return (
    <div className={style.wrapper}>
      <div className={style["l-side"]}>
        <form className={style.form}>
        <div className={style["main-column"]}>
        <div className={style.column2}>
            <label>{contentConst.actorNameEn}</label>
            <input
              type="text"
              placeholder={contentConst.fill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({ ...actor, name_en: e.target.value })
              }
            />
          </div>
          <div className={style.column2}>
            <label>{contentConst.actorNameRu}</label>
            <input
              type="text"
              placeholder={contentConst.fill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setActor({ ...actor, name_ru: e.target.value })
              }
            />
          </div>
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
            <div>
                
            </div>
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
            <input
              name="file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setFile(e.target.files[0]);
              }}
            />
          </div>
          </div>

          <div className={style.genre}>
                {actor.extInfo.genre.map((item) => 
                <div className={style.item} >
                    {item}
                    <FontAwesomeIcon 
                    className={style['close-btn']}
                    onClick={(e:React.MouseEvent) => deleteGenre(e, item)} 
                    icon={faCircleXmark} />
                 </div>
                )}
            </div>

          <button onClick={() => createActorHandle()}>Click me</button>

        </form>
      </div>

      <div className={style["r-side"]}></div>

    </div>
  );
};

export default AddActor;
