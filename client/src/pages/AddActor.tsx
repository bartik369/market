import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCamera } from '@fortawesome/free-solid-svg-icons'
import { categoryMovies } from "../utils/data/data";
import * as contentConst from "../utils/constants/content";
import { coutryList } from "../utils/data/coutry";
import { addActor, getActors } from "../store/actorSlice";
import { IActor } from "../types/media";
import style from "./AddActor.module.css";
import ActorForm from "../components/forms/ActorForm";

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

  const createActorHandler = () => {
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
          <ActorForm 
          actor={actor} 
          setActor={setActor} 
          deleteGenre={deleteGenre}
          addGenre={addGenre}
          setFile={setFile}
          createActorHandler={createActorHandler}
          />
      </div>
      <div className={style["r-side"]}>
          
      </div>

    </div>
  );
};

export default AddActor;
