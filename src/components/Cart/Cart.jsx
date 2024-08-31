import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'

import toast from 'react-hot-toast'
import { cartcontext } from '../../Context/Cartcontext'
import { Link } from 'react-router-dom'


export default function Cart() {
  let {getLoggedusercart,deleteCartitem,clearCart,updatecartCount}=useContext(cartcontext)
  const [cartDetails, setcartDetails] = useState(null)

 

 async function updateCount(id,count){
 
  let res=await updatecartCount(id,count)
 
  console.log(id);
  
 if(res.data.status=='success'){
  setcartDetails(res.data.data)
 
 }else{
  toast.error(res.data.status)
 }
  
}
 

  async function clear() {
    let res =await clearCart()
    setcartDetails(res.data.data)
    if(res.data.status=='success'){
toast.success(res.data.status)
   
}else{
  toast.error(res.data.status)
 }
 
    
    
  }
 
 async function getCart(){
  let response=await getLoggedusercart()

 
  


  if(response.data.status=='success'){
    toast.success(response.data.status)
    setcartDetails(response.data.data)
  }else{
    toast.error(response.data.status)
  }
}


 



 

useEffect(()=>{getCart()
 
},[])
async function deleteItem(id){
  let response=await deleteCartitem(id)

  
  if(response.data.status =='success'){
    setcartDetails(response.data.data.products)
    console.log(response);
    
  }
  

  
}

  return <>


  <h2 className='mt-[40%] md:mt-[10%] font-bold text-center text-3xl  text-emerald-800'> Total price :{cartDetails?.totalCartPrice}</h2>






<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[75%] mx-auto border-2 my-2 border-emerald-500 ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {cartDetails?.products.map((product)=> <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateCount(product.product.id,product.count-1)}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
<span>{product.count}</span>            </div>
            <button onClick={()=>updateCount(product.product.id,product.count+1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $ {product.price*product.count}
        </td>
        <td className="px-6 py-4">
          <button onClick={()=> deleteItem(product.product.id)} href="#" className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr> )}
     
    </tbody>
  </table>
</div>


<div className='flex justify-center my-5'>
<button onClick={()=>clear()} className='font-bold text-white p-4  bg-slate-500 md:w-[10%] rounded-lg '>clear Cart</button>
<Link className='w-[20%] ' to={'/Checkout'}><button  className='font-bold text-white p-4  bg-emerald-500 rounded-lg ms-5'>checkout Now</button></Link>

</div>






</>
}
