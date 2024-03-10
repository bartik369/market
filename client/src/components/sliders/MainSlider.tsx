import React, {FC} from 'react';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext
  } from "pure-react-carousel";
  import "pure-react-carousel/dist/react-carousel.es.css";
import style from './MainSlider.module.css';
import slide1 from '../../assets/pics/sliders/main/slide1.jpg'
import slide2 from '../../assets/pics/sliders/main/slide2.jpg'
import slide3 from '../../assets/pics/sliders/main/slide3.jpg'
import { symbolName } from 'typescript';

const MainSlider: FC = () => {

return (
    <div className={style.carousel__container}>
    <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={8}
        visibleSlides={1}
        currentSlide={1}
        
      >
        <Slider className={style.carousel__slider}>
          <Slide className={style['carousel__inner-slide']} index={0}>I am the first Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={1}>I am the second Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={2}>I am the third Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={3}>I am the fourth Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={4}>I am the fifth Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={5}>I am the sixth Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={6}>I am the seventh Slide.</Slide>
          <Slide className={style['carousel__inner-slide']} index={7}>I am the eighth Slide.</Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
      </div>
    );
}

export default MainSlider;