import React, {useState, useEffect, FC} from 'react';
import { IFilterMovie } from '../../types/media';
import {categoryMovies} from '../../utils/data/data'
import style from './DropCategory.module.css'

interface IDropCategoryProps {
    setFilterData: (filterData: IFilterMovie) => void;
    filterData: IFilterMovie;
}
const DropCategory: FC<IDropCategoryProps> = ({setFilterData, filterData}) => {

    const [isDropdownDisplayed, setIsDropDownDisplayed] = useState<boolean>(false)
    const [selectedStates, setSelectedState] = useState({})
  
    window.onclick = function() {
      setIsDropDownDisplayed((prevState) => !prevState)
    }

    const myFuc = (id:any, e:any, item:any) => {
        console.log(e)
        console.log(item)
        console.log(id)
    }
  
    return (
        <>
        <fieldset className={style['state-dropdown']} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setIsDropDownDisplayed((prevState) => !prevState)}>select category</button>
        {isDropdownDisplayed && 
        <div className={style.panel}>
            {categoryMovies.map((item) => (
                <fieldset>
                <input onChange={(e) => myFuc(item.id, e.target.checked, item.name)} 
                id={item.name} 
                type='checkbox'
                // checked={selectedStates[item.value]}
                 />
                <label htmlFor={item.value}>{item.name}</label>
                </fieldset>
            ))}
        </div>}
        </fieldset></>
    );
};

export default DropCategory;