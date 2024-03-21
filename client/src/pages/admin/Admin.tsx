import React, {FC, useEffect, PureComponent} from 'react';
import style from './Admin.module.css'
import Menu from './Menu';
import MoviesCounts from './MoviesCounts';
import UsersCounts from './UsersCounts';

const Admin: FC = () => {

    return (
        <div className={style.container}>
            <div className={style['admin-inner']}>
                <div className={style.menu}>
                <Menu />
                </div>
                <div className={style.statistics}>
                    <div className={style.item}>
                        <MoviesCounts />
                    </div>
                    <div className={style.item}>
                       <UsersCounts />
                    </div>
                    <div className={style.item}>
                    
                    </div>
                    <div className={style.item}>
                        4
                    </div>
                </div>
        </div>
        </div>
    );
};

export default Admin;