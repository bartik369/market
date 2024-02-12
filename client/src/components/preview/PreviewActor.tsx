import React, {FC} from 'react';
import { IActor } from '../../types/media';
import style from './PreviewActor.module.css'

interface PreviewActorProps {
    prevImg: string;
    actor: IActor;
    createActorHandler: () => void;
}

const PreviewActor: FC<PreviewActorProps> = ({ prevImg, actor, createActorHandler}) => {

    return (
        <div className={style.wrapper}>
            <div className={style.portrait}>
                {prevImg
                ? <img src={prevImg} alt="" />
                : <img src="" />}
            </div>
            <div className={style.info}>
                info
                <button onClick={() => createActorHandler()}>Create</button>
            </div>
        </div>
    );
};

export default PreviewActor;