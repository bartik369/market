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
        _id: '',
        name_en: '',
        name_ru: '',
        picture: '',
        extInfo: {
            link:'',
            birthday:'',
            height: '',
            genre: '',
            totalFilms: '',
        }
    });
    useEffect(() => {
        dispatch(getActors())
    }, [dispatch])

    const [file, setFile] = useState<string | Blob>('')
    const [prevImg, setPrevImg] = useState<string>('')

    const createActorHandle = () => {
        const formData = new FormData()
        type actorKey = keyof typeof actor._id;
        type actorSubKey = keyof typeof actor._id;

        Object.keys(actor).forEach((key) => {
    
            if (key === 'extInfo') {
                Object.keys(actor[key]).forEach((subKey) => {
                   formData.append(subKey, actor[key][subKey as actorSubKey])
                })
            } else {
                formData.append(key, actor[key as actorKey])
            }
        })
        formData.append('file', file)
        dispatch(addActor(formData))
    }
    actors.map((item) => {
        console.log(`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`)
    })

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
            <label>picture</label> 
            <input
            name='file' 
            type="file"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                e.target.files && setFile(e.target.files[0])
            }}
            />
        </div>

        <div className={style.block}>
            <label>link</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({
                    ...actor, extInfo: {
                     ...actor.extInfo,
                    link: e.target.value
                    }
                })}
            />
        </div>

        <div className={style.block}>
            <label>birthday</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({
                    ...actor, extInfo: {
                    ...actor.extInfo,
                    birthday: e.target.value
                    }
                })}
            />
        </div>

        <div className={style.block}>
            <label>height</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({
                    ...actor, extInfo: {
                    ...actor.extInfo,
                    height: e.target.value
                    }
                })}
            />
        </div>

        <div className={style.block}>
            <label>genre</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({
                    ...actor, extInfo: {
                    ...actor.extInfo,
                    genre: e.target.value
                    }
                })}
            />
        </div>

        <div className={style.block}>
            <label>total films</label> 
            <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setActor({
                    ...actor, extInfo: {
                    ...actor.extInfo,
                    totalFilms: e.target.value
                    }
                })}
            />
        </div>
        <button  onClick={() => createActorHandle()}>Click me</button>
        <div>
            show picks
           {actors.map((item) => 
           <div key={item._id}>
                {item.name_ru}
                <img src={`${ENV.API_URL_UPLOADS_ACTORS}${item.picture}`} alt="" />
           </div>
           )}
        </div>
       </>
        
    );
};

export default AddActor;