import React, { FC } from "react";
import { ISlider } from "../../types/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCamera } from "@fortawesome/free-solid-svg-icons";
import * as contentConst from "../../utils/constants/content";
import defaultPreview from '../../assets/pics/zaglushka.png'
import style from "./EditSliderForm.module.css";

interface IEditSliderForm {
  slider: ISlider;
  setSlider: (slider: ISlider) => void;
  updateImg: string | null;
  prevImg: string | null;
  setPrevImg: (prevImg: string | null) => void;
  addSlideHandler: (e:any) => void;
  updateSlideHandler: (e:any) => void;
  setFile: (file: string | Blob) => void;
  modalHandler: (e: any) => void;
  resetFormHandler: (e: any) => void;
  updateStatus: boolean;
}

const EditSliderForm: FC<IEditSliderForm> = ({
  slider,
  setSlider,
  prevImg,
  updateImg,
  setPrevImg,
  addSlideHandler,
  updateSlideHandler,
  setFile,
  modalHandler,
  resetFormHandler,
  updateStatus,

}) => {

  return (
    <div className={style["slider-wrapper"]}>
    <div className={style['slider-size']}>{contentConst.slideSize}</div>
      <div className={style.inner}>
        <form className={style["form-slider"]} 
        onClick={(e) => e.stopPropagation()}
        onSubmit={updateStatus ? updateSlideHandler : addSlideHandler }
        >
          <div className={style["input-info"]}>{contentConst.movieNameRu}</div>
          <input type="text" defaultValue={slider.movieTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSlider({
                ...slider,
                movieTitle: e.target.value.trim(),
              })
            }
          />
          <div className={style["input-info"]}>
            {contentConst.movieDescription}
          </div>
          <textarea defaultValue={slider.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSlider({
                ...slider,
                description: e.target.value.trim(),
              })
            }
          />
          <div className={style['slide-btns']}>
          <label className={style["photo-layer"]} htmlFor={"upload"}>
            <FontAwesomeIcon className={style["photo-icon"]} icon={faCamera} />
            <label className={style["select-photo"]}>
              {contentConst.selectSlide}
            </label>
          </label>
          <input
            type="file" name="file" id="upload" hidden 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.files && setFile(e.target.files[0]);
              e.target.files &&
                setPrevImg(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <button onClick={resetFormHandler} className={style.reset}>{contentConst.resetForm}</button>
          </div>
          <button className={style.add} type='submit'>
            {updateStatus ? contentConst.updateBtn : contentConst.addBtn}
          </button>
        </form>
        <div className={style.preview}>
          <div className={style.description}>
            {slider && slider?.description}
          </div>
          <button className={style.watch}>{contentConst.watch}</button>
          {prevImg
          ? <img src={prevImg} alt="" />
          : updateImg ? <img src={`data:image/jpeg;base64,${updateImg}`} alt="" />
          : <div className={style.zaglushka}><img src={defaultPreview} alt="" /></div>
          }
        </div>
      </div>
      <button className={style.close} onClick={modalHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default EditSliderForm;
