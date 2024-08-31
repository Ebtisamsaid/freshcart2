import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { cartcontext } from '../../Context/Cartcontext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Productdetails from '../Productdetails/Productdetails'
import { wishlistcontext } from '../../Context/Wishlistcontext'
export default function Wishlist() {
  let headers ={token:localStorage.getItem('userToken')}
 
 let{ addProductTowishlist,addwishlist,setaddwishlist,getLoggedtowishlist,removefromwishlist}=useContext(cartcontext)
//  let{addwishlist,setaddwishlist,getLoggedtowishlist,removefromwishlist}=useContext(wishlistcontext)

 async function removewishlistitem(id){
  let res=await removefromwishlist(id)
  console.log(res);
  if(res.data.status=='success'){
    toast.success(res.data.message)
    
    setcurrentId(id)
    setaddwishlist(res.data.data)
    getLoggedtowishlist()
    
  }else{
    toast.error(res.data.message)


  
  }
  
 }

useEffect(()=>{getLoggedtowishlist()
 

},[])
return <>
 
 
<div className='row  mt-20 pb-5 pt-7 mx-auto gap-x-4 w-[90%]'> {addwishlist?.map((data)=>(<div key={data.id} className='sm:w-[30%] md:w-1/4 mx-auto'>
<div className='mt-3 '>
<button onClick={()=>removewishlistitem(data.id)} className='btnn'><div><i class= "text-xl cursor-pointer fa-regular fa-circle-xmark"></i></div></button>

<Link to={`/productdetails/${data.id}/${data.category.name}`}>

<div className="products p-2 pt-3" onClick={Productdetails}>

<img src={data.imageCover} alt="" className='w-full' />
<h3 className='text-emerald-500'>{data.category.name}</h3>
<div className='flex justify-between'>
<h3>{data.title .split(' ').slice(0,2).join(' ')}</h3>

</div>
<div className='flex justify-between p-2'><h4>{data.price} EGP</h4> <span> <i className=' fas fa-star text-yellow-500'></i>{data.ratingsAverage} </span></div>


</div></Link>
<button onClick={()=>{Addtocart(data.id)}} className='btn bg-emerald-700 text-white font-serif rounded-xl p-2 pb-1'>Add to Cart</button>
</div>

</div>
))}

</div>

</>
}
