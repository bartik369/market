import React, {useState, FC, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { countryList } from '../../utils/data/coutry';
import { setMovieCountry } from '../../store/movieSlice';
import style from './Drop.module.css'

const DropCountry: FC = () => {

    const [isDropdownDisplayed, setIsDropDownDisplayed] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => state.movies.list)
    const [checkedState, setCheckedState] = useState<any>([]);
  
    return (
        <>
        <fieldset className={style['state-dropdown']} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setIsDropDownDisplayed(!isDropdownDisplayed)}>select category</button>
        {isDropdownDisplayed && 
        <div className={style['panel-country']}>
            {countryList.map((item) => (
                <div className={style.data}>
                 <input onChange={(e) => {
                     dispatch(setMovieCountry(item.name))
                     setCheckedState({...checkedState,
                        [item.id]: e.target.checked
                    })
                 }} 
                id={item.name} 
                type='checkbox'
                checked={checkedState[item.id]}
                 />
                <label htmlFor={item.value}>{item.name}</label>
                </div>
            ))
            }
        </div>}
        </fieldset></>
    );
};

export default DropCountry;