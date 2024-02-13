import React, { FC } from "react";
import { IActor } from "../../types/media";
import * as contentConst from "../../utils/constants/content";
import style from "./PreviewActor.module.css";
import BlankAvatar from "../../assets/pics/blank_avatar.jpg";

interface IPreviewActorProps {
  prevImg: string | null;
  actor: IActor;
  createActorHandler: () => void;
}

const PreviewActor: FC<IPreviewActorProps> = ({
  prevImg,
  actor,
  createActorHandler,
}) => {
  const date = new Date(actor?.extInfo.birthday);
  const currentDate = new Date();
  const myDate = currentDate.getFullYear() - date.getFullYear();

  return (
    <div className={style.wrapper}>
      <div className={style.portrait}>
        {prevImg ? <img src={prevImg} alt="" /> : <img src={BlankAvatar} />}
      </div>
      <div className={style.info}>
        <div className={style.name}>
          <span className={style.ru}>{actor?.name_ru}</span>
          <span className={style.en}>{actor?.name_en}</span>
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.bornPlace}</span>
          {`${actor?.extInfo.country}  ${actor?.extInfo.city}`}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.actorBirthday}</span>
          {date.toLocaleDateString("ru-RU")}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.actorAge}</span>
          {myDate}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.actorHeight}</span>
          {actor?.extInfo.height}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.actorGender}</span>
          {actor?.extInfo.gender}
        </div>
        <div className={style.result}>
          <span className={style.prevText}>{contentConst.actorGenre}</span>
        </div>
        <div className={style['genre-list']}>
            {actor?.extInfo.genre.map((item) => 
            <div>{item}</div>
            )}
        </div>
        <button className={style['btn-submit']} onClick={() => createActorHandler()}>{contentConst.addBtn}</button>
      </div>
    </div>
  );
};

export default PreviewActor;
