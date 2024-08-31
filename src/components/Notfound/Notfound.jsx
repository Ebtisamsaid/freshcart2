import React from 'react'
import style from './Notfound.module.css'
import pic from '../../assets/error.svg'
export default function Notfound() {
  return (
    <div className='w-[50%] m-auto mt-28'>
      <img src={pic} alt="" />
    </div>
  )
}
