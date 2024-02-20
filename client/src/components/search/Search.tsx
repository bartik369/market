import React, {FC, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ISearch } from '../../types/media';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { searchMovie, deleteSearch } from '../../store/movieSlice';
import ENV from '../../env.config';
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
        } else {
            dispatch(deleteSearch([]))
        }
    }, [text.search])
    
    return (
        <div className={style.search}>
            <div className={style.inner}>
            <div className={style.title}>Поиск </div>
            <div className={style.input}>
                <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setText({...text, search:e.target.value})}
                 type="text" autoFocus />
            </div>
            <div className={style.result}>
                {searchResult.map((item) =>
                    <div className={style.item}>
                    <div className={style.description}>
                        <div className="title">
                            <div className={style.ru}>
                            <a href={`/movies/${item._id}`}>{item.titleRu}</a>
                            </div>
                            <div className={style.en}>{item.titleEn}</div>
                        </div>
                        <span>{item.year}</span>
                        <span>{item.country}</span>
                    </div>
                </div>
                )}
            </div>
            </div>
            <br />
            <button className={style.close} onClick={visibleHandler}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

export default Search;