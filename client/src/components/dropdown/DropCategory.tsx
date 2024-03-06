import React, {useState, FC, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {categoryMovies} from '../../utils/data/data';
import { setMovieCategory } from '../../store/movieSlice';
import * as contentConst from '../../utils/constants/content';
import style from './Drop.module.css'

const DropCategory: FC = () => {

    const [isDropdownDisplayed, setIsDropDownDisplayed] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => state.movies.list)
    const [checkedState, setCheckedState] = useState<any>([]);
  
    return (
        <>
        <fieldset className={style['state-dropdown']} onClick={(e) => e.stopPropagation()}>
        <button className={style['drop-btn']} onClick={() => setIsDropDownDisplayed(!isDropdownDisplayed)}>
           <span>{contentConst.movieCategory}</span>
           {isDropdownDisplayed 
           ? <FontAwesomeIcon icon={faArrowUp} />
           : <FontAwesomeIcon icon={faArrowDown} />
           }
        </button>
        {isDropdownDisplayed && 
        <div className={style['panel-three']}>
            {categoryMovies.map((item) => (
               <label className={style['check-container']}>
                 <input onChange={(e) => {
                     dispatch(setMovieCategory(item.name))
                     setCheckedState({...checkedState,
                        [item.id]: e.target.checked
                    })
                 }} 
                id={item.name} 
                type='checkbox'
                checked={checkedState[item.id]}
                 />
                 <span className={style.checkmark}></span>
                <label htmlFor={item.value}>{item.name}</label>
                </label>
            ))
            }
        </div>}
        </fieldset></>
    );
};

export default DropCategory;