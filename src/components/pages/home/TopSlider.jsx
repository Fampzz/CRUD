import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './topslider.css'; // Importe o arquivo de estilos
import img from "../../../img/IMGSlider.jpg";
const TopSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
      cssEase: "linear",
  };

  return (
    <Slider {...settings} className="custom-slider">
       <div>
        <img src={img} alt="Imagem 1" className='slider-item' />
      </div>
      <div>
        <img src={img} alt="Imagem 2" className='slider-item' />
      </div>
      <div>
        <img src={img} alt="Imagem 3" className='slider-item' />
      </div>
      <div>
        <img src={img} alt="Imagem 4" className='slider-item' />
      </div>
      <div>
        <img src={img} alt="Imagem 5" className='slider-item' />
      </div>
    </Slider> 
  );
};

export default TopSlider;
