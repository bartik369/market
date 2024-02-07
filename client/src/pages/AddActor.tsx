import React, {FC, useEffect, useState} from 'react';
import { IActor } from '../types/media';
import style from './AddActor.module.css'

const AddActor: FC = () => {

    const [actor, setActor] = useState<IActor>({
        id: '',
        name: '',
        surname: '',
        picture: null,
        link: '',
    })

    console.log(actor)

    const addActor = () => {

    }

    return (
       <div>
        <div className={style.block}>
            <label>name</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActor({...actor, name: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>surname</label> 
            <input type="text" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActor({...actor, surname: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>link</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActor({...actor, link: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>picture</label> 
            <input type="file" />
        </div>
        {/* <button onClick={addActor(actor)}></button> */}
       </div>
        
    );
};

export default AddActor;