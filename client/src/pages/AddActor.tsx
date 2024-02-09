import React, {FC, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import ENV from '../env.config';
import {addActor, getActors} from '../store/actorSlice'
import { IActor } from '../types/media';
import style from './AddActor.module.css'

const AddActor: FC = () => {
    const dispatch = useAppDispatch()
    const actors = useAppSelector(state => state.actors.list)
    const [actor, setActor] = useState<IActor>({
        id: '',
        name_en: '',
        name_ru: '',
        picture: '',
        link: '',
    });
    useEffect(() => {
        dispatch(getActors())
    }, [dispatch])

    console.log(actors)

    const [file, setFile] = useState<string | Blob>('')
    const [prevImg, setPrevImg] = useState<string>('')

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
            <label>name_en</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({...actor, name_en: e.target.value})}
            />
        </div>
        <div className={style.block}>
            <label>name_ru</label> 
            <input type="text" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({...actor, name_ru: e.target.value})}
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
        <div>
            show picks
           {actors.map((item) => 
            <img key={item.id} src={`${ENV.API_URL_PICS_ACTORS}${item.picture}`} alt="" />
           )}
        </div>
       </>
        
    );
};

export default AddActor;