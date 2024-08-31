import React from 'react'
import style from './Products.module.css'
import useproducts from '../../hooks/useproducts'
import { Link } from 'react-router-dom'
import Productdetails from '../Productdetails/Productdetails'
export default function Products() {
  let{data,isError,error,isLoading}=useproducts()
  if(isLoading){
    return <span class="loader"></span>
  }
  if(isError){
    <h3>{isError}</h3>
  }
  return  <>
 
 
  <div className='row pt-7 w-[75%] mx-auto '> {data.map((data)=>(<div key={data.id} className='sm:w-[80%] md:w-1/4'>
<Link to={`/productdetails/${data.id}/${data.category.name}`}>
<div className="products p-2" onClick={Productdetails}>
<img src={data.imageCover} alt="" className='w-full' />
<h3 className='text-emerald-500'>{data.category.name}</h3>
<div className="flex justify-between">
<h3>{data.title .split(' ').slice(0,2).join(' ')}</h3>
<Link   to="#" className= " relative flex text-gray-900 dark:text-white  mx-1"><i class="text-xl fa-regular fa-heart"></i></Link>

</div>
<div className='flex justify-between p-2'><h4>{data.price} EGP</h4> <span> <i className=' fas fa-star text-yellow-500'></i>{data.ratingsAverage} </span></div>


  </div></Link>
  <button className='btn bg-emerald-700 text-white font-serif rounded-xl p-2 pb-1'>Add to Cart</button>
 </div>))}
 
 </div>

 </>
}
