import React from 'react'
import style from './Brands.module.css'
import  { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Brands() {
  const [allbrands, setAllbrands] = useState([])
  function getAllbrands(){
    axios.get('https://ecommerce.routemisr.com/api/v1/brands').then((res)=>{setAllbrands(res.data.data)
  
      
    }
    ).catch((err)=>err)
  }
  useEffect(()=>
    {getAllbrands()},[])
    return<>
    
  <div className="row sm:w-[100%] md:w-[60%]  mx-auto mt-24">
    {allbrands.map((data)=> <Link   to={`/brands/${data.name}/${data._id}`}>
      <div className="w-[200px] h-[200px] my-14 mx-5">
    <img src={data.image} alt="" className='w-full'/>
    <h3>{data.name}</h3>
    </div>
    </Link>)}
  
  </div>
   
    
    </>
}
