import React, {FC, useEffect} from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';

const Breadcrumbs: FC = () => {

    const movieTitles = useAppSelector(state => state.movies.movie.titleRu)
    const location = useLocation();
    let navigate = useNavigate();
    let currentLink = ''
    const regEx = location.pathname.match(/\/movies\/[a-zA-Z0-9]/)
    const pathnames = location.pathname.split("/").filter(x => x);
    const pages = { 'movies': 'Фильмы', 'profile': 'Профиль' };
   return (
  <>
    {pathnames.length > 0 
    ? (<Link onClick={() => navigate("/")} to={''}>Главная</Link>) 
    : ('')}

    {pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;

      return isLast
      ? ( <div key={name}>{regEx ? movieTitles : pages[name as keyof typeof pages]}</div>) 
      : (
        <Link key={name} onClick={() => navigate(routeTo)} to={routeTo}>
          {pages[name as keyof typeof pages]}
        </Link>
      );

    })}
  </>
); 
};

export default Breadcrumbs;
