import React, {FC, useEffect, useState} from 'react';
import { ISearch } from '../../types/media';
import { useAppDispatch } from '../../hooks/reduxHook';
import { searchMovie } from '../../store/movieSlice';
import style from './Search.module.css'

interface IVisibleProps {
    visible: boolean;
    visibleHandler:() => void;
}


const Search:FC<IVisibleProps> = ({visible, visibleHandler}) => {

    const [text, setText] = useState<ISearch>({
        search: '',
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(searchMovie(text));
    }, [text.search.length])

    console.log('tezt')
    
    return (
        <div className={style.search}>
            <div className={style.input}>
                <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setText({...text, search:e.target.value})}
                 type="text" />
            </div>
            <div className={style.result}>
                result
            </div>
            <button onClick={visibleHandler}>close</button>
        </div>
    );
};

export default Search;