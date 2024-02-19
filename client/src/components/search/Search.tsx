import React, {FC, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ISearch } from '../../types/media';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
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
    const searchResult = useAppSelector((state) => state.movies.search)
    console.log(searchResult)

    useEffect(() => {
        if (text.search.length) {
            dispatch(searchMovie(text));
        }
    }, [text.search])
    
    return (
        <div className={style.search}>
            <div className={style.input}>
                <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setText({...text, search:e.target.value})}
                 type="text" />
            </div>
            <div className={style.result}>
                {searchResult.map((item) =>
                <a href={`/movies/${item._id}`}>{item.titleRu}</a>
                )}
            </div>
            <button onClick={visibleHandler}>close</button>
        </div>
    );
};

export default Search;