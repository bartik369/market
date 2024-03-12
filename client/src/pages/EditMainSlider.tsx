import React, {FC, useState, useEffect} from 'react';
import { ISlider } from '../types/media';
import { useAddSlideMutation, useGetSlidesQuery } from '../store/adminApi';
import style from './EditMainSlider.module.css'
import EditSliderForm from '../components/forms/EditSliderForm';
import SlidersList from '../components/sliders/SlidersList';

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
    const [modalSlider, setModalSlider] = useState<boolean>(false)
    const {data: slides} = useGetSlidesQuery()

    const sliderHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const formData = new FormData();
        type sliderKey = keyof typeof slider._id;
        Object.keys(slider).forEach((key) => {
            formData.append(key, slider[key as sliderKey]);
        });
        file && formData.append('file', file)
        addSlide(formData)

    }
    const resetFormHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setSlider({
            _id: '',
            movieTitle: '',
            movieId: '',
            movieLink: '',
            media: '',
            description: '',
        });
        setPrevImg(null);
    }
    const modalHandler = () => {
        setModalSlider(!modalSlider);
        setSlider({
            _id: '',
            movieTitle: '',
            movieId: '',
            movieLink: '',
            media: '',
            description: '',
        });
        setPrevImg(null);
    }

    return (
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.add}>
                <button onClick={() => setModalSlider(!modalSlider)}>
                добавить новый слайдер
            </button>
                </div>
            <SlidersList />
            {modalSlider &&
            <EditSliderForm
            slider={slider}
            setSlider={setSlider}
            prevImg={prevImg}
            setPrevImg={setPrevImg}
            setFile={setFile}
            sliderHandler={sliderHandler}
            modalHandler={modalHandler}
            resetFormHandler={resetFormHandler}
            />
            }
            </div>
        </div>
    );
};

export default EditMainSlider;