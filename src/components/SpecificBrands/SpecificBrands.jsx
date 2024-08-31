
 

   import style from './SpecificBrands.module.css'

  import React from 'react'
  import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
  export default function SpecificBrands() {
    const [getbrand, setgetbrand] = useState([])
    let{name,id}= useParams()
      console.log(name);
      
      
    function getspecific(id){
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((res)=> 
     
     {  
  
  
  console.log(related);
  
     }
      
  ).catch((err)=>err)
     
       
    } 
    function allSpecific(){
      axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res)=>{
      
       console.log(res.data.data);
       
  
  let related = res.data.data.filter((product) => 
    product.brand.name == name
  
  )
  
  setgetbrand(related)
  console.log(related);
  
  })
    }
   
    
  useEffect(()=>{getspecific(id)
    allSpecific()
  },[])
    return <>
   
  {getbrand.length >0 ?   <div className="row w-[80%] mx-auto mt-12 p-9">
    {getbrand.map((product)=>
   
  <NavLink className='sm:w-[80%] md:w-[30%]' to={`/productdetails/${product.id}/${product.category.name}`}>
  <div className='  mx-auto'>
     <img src={product.imageCover} alt="" />
     <h3 className='p-2 text-emerald-800 font-bold'>{product.title}</h3>
   </div>
  
   </NavLink>
    )}
   
   </div>: <h2 className='mt-12 text-center text-3xl text-emerald-800 font-bold relative top-[200px] uppercase' >sold.....</h2>} 
   
  
  
  























   
  
     
  
    
    </>
  }
  