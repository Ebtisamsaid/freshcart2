import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import axios from 'axios'
import { cartcontext } from '../../Context/Cartcontext'
export default function Allorders() {
  let{cartnumowner}=useContext(cartcontext)
  const [sdata, setdata] = useState('')
  const [Allorder, setAllorder] = useState([])
  let headers ={token:localStorage.getItem('userToken')}

  //  function getOwnernum(){
  //   axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then((res)=>
  //     {
  //       setCartownernum(res.data.data.cartOwner)
  //       console.log(res);
        
  //      return res
  //     }).catch((err)=>err)
  
   
  //  }
  function getAllorders(){
  
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartnumowner}`)
  .then((res)=>
  {console.log(res);
    const cartItems = res.data[0].cartItems;
    res.data.forEach(item => {
      setAllorder(cartItems)
      console.log(cartItems);
     
    });
    const shipdata=res.data[0]
    console.log(shipdata.id);
    
    setdata(shipdata)
   return res
  }
  )
  .catch((err)=>err)
}
  useEffect(()=>{
    getAllorders()
  },[])
  return <>
  
<div className=" mt-20 relative overflow-x-auto shadow-md sm:rounded-lg w-[75%] mx-auto border-2 my-2 border-emerald-500 ">
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
        
      </tr>
    </thead>
    <tbody>
      {Allorder?.map((item)=>
 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-2">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt= {item.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {item.product.title}
        
        </td>
        <td className="px-6 py-4">
        {item.count}
        </td>
        
        <td className="px-6 py-4">
        {item.price}
        </td>
      </tr>
    
    )}
    
     
    </tbody>
    <div className='py-5'>
      <h3 className='m-5 text-emerald-800 font-semibold'>shippingPrice : {sdata.shippingPrice} EGP</h3>
      <h3 className='m-5 text-emerald-800 font-semibold'>taxPrice : {sdata.taxPrice} EGP</h3>
      <h3 className='m-5 text-emerald-800 font-semibold'>totalOrderPrice : {sdata.totalOrderPrice} EGP</h3>
    
     
    
    </div>
  </table>
</div>



  
  
  
  </>
}
