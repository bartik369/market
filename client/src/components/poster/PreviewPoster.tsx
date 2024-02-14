import React, { FC } from "react";
import { IMovie } from "../../types/media";
import * as contentConst from "../../utils/constants/content";
import BlankAvatar from "../../assets/pics/blank_avatar.jpg";
import style from "./PreviewPoster.module.css";

interface IPreviewPosterProps {
  prevImg: string | null;
  movie: IMovie;
  createMovieHandler: () => void;
}

const PreviewPoster: FC<IPreviewPosterProps> = ({
  prevImg,
  movie,
  createMovieHandler,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.portrait}>
        {prevImg ? <img src={prevImg} alt="" /> : <img src={BlankAvatar} />}
      </div>

      <div className={style.info}>
        <div className={style.name}>
          <span className={style.ru}>{movie?.title_ru}</span>
          <span className={style.en}>{movie?.title_en}</span>
        </div>

        {movie?.year && 
        <div className={style.block}>
        <span className={style.prevText}>{contentConst.movieYear}</span>
        <span className={style.result}>{movie.year}</span>
        </div>
        }

        {movie?.country &&
         <div className={style.block}>
         <span className={style.prevText}>{contentConst.movieCountry}</span>
         <span className={style.result}>{movie.country}</span> 
       </div>
       }
        
        {movie?.time &&
        <div className={style.block}>
        <span className={style.prevText}>{contentConst.movieTime}</span>
        <span className={style.result}>{movie.time}</span>
        </div>
        }
        
        {movie.director &&
          <div className={style.block}>
          <span className={style.prevText}>{contentConst.movieDirector}</span>
          <span className={style.result}>{movie.director}</span>
        </div>
        }

        {movie.description &&
           <div className={style['desc-info']}>
           <span className={style.prevText}>{contentConst.movieDescription}</span>
           <span className={style.description}>{movie.description }</span>
         </div>
        }

        {movie.genre.length ?
           <div className={style.block}>
           <span className={style.prevText}>{contentConst.movieCategory}</span>
           <div className={style['genre-column']}>
               {movie.genre.map((item) => 
               <span className={style['list-item']}>{item}</span>)
               }
         </div>
         </div>
        : ''
        }

        {movie.actors.length ?
          <div className={style.block}>
          <span className={style.prevText}>{contentConst.movieCast}</span>
          <div className={style['genre-column']}>
              {movie.actors.map((item) => 
              <span className={style['list-item']}>{item}</span>)
              }
          </div>
          </div>
        :''
        }
        
        <button
          className={style["btn-submit"]}
          onClick={() => createMovieHandler()}
        >
          {contentConst.addBtn}
        </button>
      </div>
    </div>
  );
};

export default PreviewPoster;