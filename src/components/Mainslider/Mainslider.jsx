import React from 'react'
import style from './Mainslider.module.css'
import Slider from 'react-slick'
import slider1 from '../../assets/blog-img-2.jpeg'
import slider2 from '../../assets/slider-2.jpeg'
import slider3 from '../../assets/slider-image-1.jpeg'
import slider4 from '../../assets/slider-image-2.jpeg'
import slider5 from '../../assets/slider-image-3.jpeg'
export default function Mainslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    arrows:false
  };
  return (
    <div>
<div className="row mt-24 md:w-[75%] sm:w-[60%] mx-auto ">
  <div className="w-3/4  z-[-1] ">
  <Slider {...settings}>
    <img src={slider1} alt=""  className='w-full h-[300px]'/>
    <img src={slider2} alt="" className='w-full h-[300px]' />
    <img src={slider3} alt="" className='w-full h-[300px]' />
  </Slider>
  </div>
  <div className="w-1/4 ">
  <img src={slider4} alt=""  className='w-full h-[150px]'/>
  <img src={slider5} alt="" className='w-full h-[150px]' />
  </div>

  </div>
</div>



    
  )
}
