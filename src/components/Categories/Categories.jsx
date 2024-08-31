import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Categories() {
const [allCategory, setAllcategory] = useState([])
function getAllcategory(){
  axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((res)=>{setAllcategory(res.data.data)

    
  }
  ).catch((err)=>err)
}
useEffect(()=>
  {getAllcategory()},[])
  return<>
  
<div className="row   mx-auto mt-24 sm:w-[100%] md:w-[60%]">
  {allCategory.map((data)=> <Link   to={`/categories/${data.name}/${data._id}`}>
    <div className="w-[200px] h-[200px] my-14 mx-5">
  <img src={data.image} alt="" className='w-full'/>
  <h3>{data.name}</h3>
  </div>
  </Link>)}

</div>
 
  
  </>
}
