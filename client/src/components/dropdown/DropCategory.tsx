import React, {useState, FC, useEffect, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {categoryMovies} from '../../utils/data/data';
import { setMovieCategory } from '../../store/movieSlice';
import * as contentConst from '../../utils/constants/content';
import style from './Drop.module.css'

const DropCategory: FC = () => {

    const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => state.movies.list)
    const [checkedState, setCheckedState] = useState<any>([]);
    const myRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
          if (myRef.current && !myRef.current.contains(e.target)) {
            setDropdownDisplay(false) 
          }
        }
        document.addEventListener("click", checkIfClickedOutside)
        return () => {
          document.removeEventListener("click", checkIfClickedOutside)
        }
      }, [])
  
    return (
        <>
        <fieldset>
        <button ref={myRef} className={style['drop-btn']} onClick={() => setDropdownDisplay(!dropdownDisplay)}>
           <span>{contentConst.movieCategory}</span>
           <div className={style.angle}>
           {dropdownDisplay 
           ? <FontAwesomeIcon icon={faAngleUp} />
           : <FontAwesomeIcon icon={faAngleDown} />
           }
           </div>
        </button>
        {dropdownDisplay && 
        <div className={style['panel-three']} onClick={e =>  e.stopPropagation()}>
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