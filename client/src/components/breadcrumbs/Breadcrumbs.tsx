import React, {FC, useEffect} from 'react';
import { useLocation, Link} from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';

export interface ILocationState {
    id: string;
    pathname: string;
    title: string;
    url: string
}

const Breadcrumbs: FC = () => {
    const movieTitles = useAppSelector(state => state.movies.movie.titleRu)
    // const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/)
    const data = useLocation().state as ILocationState[]

    return (
        <div>
         
        </div>
    )

};

export default Breadcrumbs;