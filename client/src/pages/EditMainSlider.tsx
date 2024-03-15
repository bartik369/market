import React, {FC, useState, useEffect} from 'react';
import { ISlider } from '../types/media';
import * as contentConst from '../utils/constants/content'
import { 
    useAddSlideMutation, 
    useGetSlidesQuery, 
    useGetSlideMutation,
    useDeleteSlideMutation,
    useUpdateSideMutation,
 } from '../store/adminApi';
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
    const [addSlide, {data}] = useAddSlideMutation();
    const [getSlide, {data: slide}] = useGetSlideMutation()
    const [deleteSlide] = useDeleteSlideMutation();
    const [updateSlide] = useUpdateSideMutation();
    const [file, setFile] = useState<string | Blob>('');
    const [prevImg, setPrevImg] = useState<string | null>('');
    const [updateImg, setUpdateImg] = useState<string | null>('');
    const [modalSlider, setModalSlider] = useState<boolean>(false)
    const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const {data: slides} = useGetSlidesQuery();

    useEffect(() => {
       if (slide) {
        setSlider({...slider, ...slide.slideData});
        setUpdateImg(slide.file64)
       }
    }, [slide])

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
    const modalHandler = (e: { preventDefault: () => void; }) => {
        setModalSlider(!modalSlider);
        resetFormHandler(e)
        setPrevImg(null);
        setUpdateImg(null);
        setUpdateStatus(false)
    }
    const getSlideHandler = (id:string) => {
        getSlide(id)
        setModalSlider(true)
        setUpdateStatus(true)
    }
    const removeSlideHandler = async (id:string) => {
        await deleteSlide(id)    
    }

    const addSlideHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const formData = new FormData();
        type sliderKey = keyof typeof slider._id;
        Object.keys(slider).forEach((key) => {
            formData.append(key, slider[key as sliderKey]);
        });
        file && formData.append('file', file);
        await addSlide(formData).then((payload) => {
            payload && setModalSlider(false)
        });
    }
    const updateSlideHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const formData = new FormData();
        type sliderKey = keyof typeof slider._id;
        Object.keys(slider).forEach((key) => {
            formData.append(key, slider[key as sliderKey]);
        });
        file && formData.append('file', file);
        await updateSlide(formData).then((payload) => {
             payload && setModalSlider(false)
        });
    }

    return (
        <div className={style.container}>
            <div className={style.container__inner}>
                <div className={style.add}>
                <button className={style.btn} onClick={() => setModalSlider(!modalSlider)}>
                   {contentConst.addSlide}
                </button>
            </div>
            <SlidersList
            update={getSlideHandler}
            remove={removeSlideHandler}
            />
            {modalSlider &&
            <EditSliderForm
            slider={slider}
            setSlider={setSlider}
            prevImg={prevImg}
            updateImg={updateImg}
            setPrevImg={setPrevImg}
            setFile={setFile}
            addSlideHandler={addSlideHandler}
            updateSlideHandler={updateSlideHandler}
            modalHandler={modalHandler}
            resetFormHandler={resetFormHandler}
            updateStatus={updateStatus}
            />
            }
            </div>
        </div>
    );
};

export default EditMainSlider;