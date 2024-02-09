import React, {FC, useState} from 'react';
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
    });
    const [file, setFile] = useState<string | Blob>('')

    console.log(file)

    const createActorHandle = () => {
        const formData = new FormData()
        const keys = Object.keys(actor) as Array<keyof typeof actor>;

        keys.forEach((key) => {
            formData.append(key, actor[key]!)
        })
        formData.append('file', file)
        dispatch(addActor(formData))
    }

    return (
       <>
        <div className={style.block}>
            <label>name</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({...actor, name: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>surname</label> 
            <input type="text" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({...actor, surname: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>link</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({...actor, link: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>picture</label> 
            <input
            name='file' 
            type="file"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setFile(e.target.files[0])
            }}
            />
        </div>
        <button  onClick={() => createActorHandle()}>Click me</button>
       </>
        
    );
};

export default AddActor;