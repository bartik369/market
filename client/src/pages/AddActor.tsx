import React, {FC, useEffect, useState} from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import {addActor} from '../store/actorSlice'
import { IActor } from '../types/media';
import style from './AddActor.module.css'

const AddActor: FC = () => {
    const dispatch = useAppDispatch()

    const [actor, setActor] = useState<IActor>({
        id: '',
        name: '',
        surname: '',
        picture: '',
        link: '',
    })

    const createActorHandle = () => {
        dispatch(addActor(actor))
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
        <button onClick={() => createActorHandle()}>Click me</button>
       </div>
        
    );
};

export default AddActor;