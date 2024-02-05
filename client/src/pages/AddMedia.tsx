import React, {FC} from 'react';
import style from './AddMedia.module.css'

const AddMedia: FC = () => {
    return (
        <div>
            <form className={style.form} action="" >
                <label htmlFor="">Имя</label>
                <input type="text" />
                <label htmlFor="">Описание</label>
                <input type="text" />
                <label htmlFor="">Name</label>
                <input type="text" />
            </form>
            
        </div>
    );
};

export default AddMedia;