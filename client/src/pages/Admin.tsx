import React, {FC, useEffect} from 'react';
import { useGetMoviesCountQuery, useGetUsersQuery } from '../store/adminApi';
import { Link } from 'react-router-dom';
import style from './Admin.module.css'

const Admin: FC = () => {
    const {data: users} = useGetUsersQuery();
    const {data: moviesCount} = useGetMoviesCountQuery();

    useEffect(() => {
        console.log(users && users)
        console.log(moviesCount && moviesCount)
    }, [users, moviesCount])

    return (
        <div className={style.container}>
            <Link to={'/admin/edit-slider'}>Слайдер</Link>
            <Link to={'/admin/add-movie'}>Добавить фильм</Link>
            <Link to={'/admin/add-actor'}>Добавить актера</Link>
        </div>
    );
};

export default Admin;