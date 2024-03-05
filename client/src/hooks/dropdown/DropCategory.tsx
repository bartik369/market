import React, {useState, FC} from 'react';
import { useAppDispatch, useAppSelector } from '../reduxHook';
import { IFilterMovie, IFilterCategory } from '../../types/media';
import {categoryMovies} from '../../utils/data/data';
import { setMovieCategory } from '../../store/movieSlice';
import style from './DropCategory.module.css'

interface IDropCategoryProps {
    setFilterData: (filterData: IFilterMovie) => void;
    filterData: IFilterMovie;
}
const DropCategory: FC<IDropCategoryProps> = ({setFilterData, filterData}) => {

    const [isDropdownDisplayed, setIsDropDownDisplayed] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const filter = useAppSelector(state => state.movies.filter.category)
    const [checkedState, setCheckedState] = useState<any>({});

    console.log(filter)

    const dataHandler = (
        e:React.ChangeEvent<HTMLInputElement>, 
        id: number, 
        name: string) => {
        dispatch(setMovieCategory({id: id, value: name}))
    }
  
    return (
        <>
        <fieldset className={style['state-dropdown']} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setIsDropDownDisplayed(!isDropdownDisplayed)}>select category</button>
        {isDropdownDisplayed && 
        <div className={style.panel}>
            {categoryMovies.map((item) => (
                <div className={style.data}>
                 <input onChange={(e) => {
                     dataHandler(e, item.id, item.name)
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

export default DropCategory;