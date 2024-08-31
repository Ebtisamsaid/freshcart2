import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import Productdetails from '../Productdetails/Productdetails'
import { useQuery } from '@tanstack/react-query'
import useproducts from '../../hooks/useproducts'
import { cartcontext } from '../../Context/Cartcontext'
import toast from 'react-hot-toast';

export default function RecentProducts() {
 let {setcartnum,wishid,getProducttocart,addProductTowishlist,removefromwishlist,setaddwishlist,addwishlist,wishlistcheck} =useContext(cartcontext)
 const [wishlist, setWishlist] = useState(false);
 const [currentId, setcurrentId] = useState(null);

let{data,isError,error,isLoading}=useproducts()
  if(isLoading){
    return <span class="loader"></span>
  }
  if(isError){
    <h3>{isError}</h3>
  }
  async function Addtocart(id) {
    let response = await getProducttocart(id)
console.log(response);
if(response.data.status=='success'){
  toast.success(response.data.status)
  setcartnum(res.data.numOfCartItems)
}else{
  toast.error(response.data.status)
}

    
  }
  async function addtowishlist(id){
   
 
    let res=await addProductTowishlist(id)
   console.log(res);
  
    if(res.data.status=='success'){
      toast.success(res.data.message)
    
      setWishlist(true)
    }else{
      toast.error(res.data.message)
    
      setWishlist(false)
    
    }
  }
  console.log(wishid);
  
 async function removewishlistitem(id){
  let res=await removefromwishlist(id)
  console.log(res);
  if(res.data.status=='success'){
    toast.success(res.data.message)
   
   
    setaddwishlist(res.data.data)
  }else{
    toast.error(res.data.message)


  
  }
  
 }
  // const [products, setProducts] = useState([])
  // const [isloading, setisloading] = useState(false)
  // function getProducts(){
  //   setisloading(true)
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   .then((res)=>{setProducts(res.data.data)
  //    console.log(products);
  //    setisloading(false)
      
  //   })
  //   .catch((res)=>{
  //     setisloading(false)
  //   })
  
  // }
  // useEffect(()=>{ getProducts()},[])
 
  return <>
 
 
  <div className='row pt-7 '> {data.map((data)=>(<div key={data.id} className='sm:w-[80%] md:w-1/4'>
<Link to={`productdetails/${data.id}/${data.category.name}`}>
<div className="products p-2" onClick={Productdetails}>
<img src={data.imageCover} alt="" className='w-full' />
<h3 className='text-emerald-500'>{data.category.name}</h3>
<div className='flex justify-between'>
<h3>{data.title .split(' ').slice(0,2).join(' ')}</h3>
{/* 
<Link  onClick={()=>{addtowishlist(data.id)}}  to="#" className= " relative flex text-gray-900 dark:text-white  mx-1">

{wishlist&&currentId == data.id ? <i  className='text-xl fa-solid fa-heart text-emerald-500'></i>: <i className=' text-xl fa-regular fa-heart'></i>}

</Link> */}


<Link   to="#" className= " relative flex text-gray-900 dark:text-white  mx-1">

 <i onClick={()=>{wishlistcheck.some((i)=>i===data.id)?removewishlistitem(data.id):addtowishlist(data.id)}} className={`${wishlistcheck.some((i)=>i===data.id)? 'text-xl fa-solid fa-heart text-emerald-500':'text-xl fa-regular fa-heart'}`}></i> 

</Link>

</div>
<div className='flex justify-between p-2'><h4>{data.price} EGP</h4> <span> <i className='fas fa-star text-yellow-500'></i>{data.ratingsAverage} </span></div>


  </div></Link>
  <button onClick={()=>{Addtocart(data.id)}} className='btn bg-emerald-700 text-white font-serif rounded-xl p-2 pb-1'>Add to Cart</button>
 </div>))}
 
 </div>

 </>
}
// 'fa-solid fa-heart text-emerald-500' onClick={()=>{removewishlistitem(data.id)}}