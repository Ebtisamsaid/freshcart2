import React from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import Categoryslider from '../categoryslider/categoryslider'
import Mainslider from '../Mainslider/Mainslider'
export default function Home() {
  return <>
    <div className="container mx-auto w-[75%] "></div>
   
   
    <div/>
  <div className="container mx-auto w-[75%] mt-10">
  <Mainslider/>
  <Categoryslider/>
     <RecentProducts/>
  </div>
  </>
}
