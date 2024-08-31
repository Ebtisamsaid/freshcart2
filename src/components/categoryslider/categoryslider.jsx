import React, { useEffect, useState } from 'react'
import style from './Categoryslider.module.css'

import axios from 'axios'
import Slider from 'react-slick'

export default function Categoryslider() {
  const [categories, setcategories] = useState([])
  function getcategory(){
  axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  .then((res)=>{
    console.log(res.data);
    setcategories(res.data.data)
  })}
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:2000,
  };
useEffect(()=>{getcategory()},[])
  return <>
  <h2 className='text-lg mt-5 font-bold z-[-1]'>shop popular categories</h2>
    <Slider {...settings} className='z-[-1] w-[250%] md:w-full'>
      {categories.map((category) => <div> <img src={category.image} className='w-full h-[200px] mt-10 z-[-1]'/>
    <h3>{category.name}</h3> </div>)}
      </Slider> 
      </>
}