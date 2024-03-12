import React, {FC, useState, useEffect} from 'react';
import { ISlider } from '../types/media';
import { useAddSlideMutation, useGetSlidesQuery } from '../store/adminApi';
import style from './EditMainSlider.module.css'

const EditMainSlider: FC = () => {
    const [slider, setSlider] = useState<ISlider>({
        _id: '',
        movieTitle: '',
        movieId: '',
        movieLink: '',
        media: '',
        description: '',
    });
    const [addSlide] = useAddSlideMutation();
    const [file, setFile] = useState<string | Blob>('');
    const [prevImg, setPrevImg] = useState<string | null>('');
    const {data: slides} = useGetSlidesQuery()

    const sliderHandler = () => {
        const formData = new FormData();
        type sliderKey = keyof typeof slider._id;
        Object.keys(slider).forEach((key) => {
            formData.append(key, slider[key as sliderKey]);
        });
        file && formData.append('file', file)
        addSlide(formData)

    }

    return (
        <div className={style.container}>
        <div>title film</div>
           <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlider({
               ...slider,  movieTitle: e.target.value.trim()
           })}
           type="text" />
           <div>description</div>
           <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSlider({
               ...slider, description: e.target.value.trim()
           })}
           />
           <div>slide</div>
           <input 
           type="file" 
           name="file"
           id="upload"
           onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            e.target.files && setFile(e.target.files[0]);
            e.target.files && setPrevImg(URL.createObjectURL(e.target.files[0]))
           }}
           />
           <button onClick={() => sliderHandler()}>Добавить сладер</button>
           <img src={prevImg!} alt="" />
        </div>
    );
};

export default EditMainSlider;