import React, {FC, useEffect} from 'react';
import { useGetMoviesCountQuery, useGetUsersQuery } from '../store/adminApi';
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
           <p>adminka</p> 
        </div>
    );
};

export default Admin;