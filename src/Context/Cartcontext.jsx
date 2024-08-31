import axios from "axios"
import React, { createContext, useState } from "react"
import { useEffect } from "react"
import toast from "react-hot-toast"

export let cartcontext=createContext()
export default function Cartcontextprovider(props){
const [cartID, setcartID] = useState('')
const [cartnum, setcartnum] = useState(0)
const [cartnumowner, setcartowner] = useState(0)
const [addwishlist, setaddwishlist] = useState(null)
const [wishid, setwishid] = useState(null)
const [wishlistcheck, setwishlistcheck] = useState([])
let headers ={token:localStorage.getItem('userToken')}
function removefromwishlist(id){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
  .then((res)=>{
    setwishlistcheck(res.data.data)
    res
  }).catch((err)=>{
    setwishlistcheck(0)
    err
  })
}
function addProductTowishlist(productId){
  return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:productId},{headers})
    .then((res)=> 
      
        {
          setwishlistcheck(res.data.data)
          setwishid(productId)
         return res}).catch((err)=>{
          setwishlistcheck(0)
          err
         })
  
}
function getLoggedtowishlist(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
  .then((res)=>{
    
    if(res.data.status=='success'){
      setaddwishlist(res.data.data)
      removefromwishlist(id)
      setwishlistcheck(res.data.data.map((item)=>item.id))
    }
  return  res
  }
  )
  .catch((err)=>err)
}
function checkout (cardID,url,formvalues){
return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardID}?url=${url}`,{shippingAddress:formvalues},{headers})
  .then((res)=>res)
  .catch((err)=>err)
}
     function getProducttocart(productId){
    return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {productId:productId,},
        {headers},)
        .then((res)=> {
          setcartnum(res.data.numOfCartItems)
          res
        }) .catch((res)=> res)}
  function getLoggedusercart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then((res)=>
    {
      setcartnum(res.data.numOfCartItems)
      setcartowner(res.data.data.cartOwner)
      console.log(res.data.data.cartOwner);
      
      setcartID(res.data.data._id)
      return res
    }
    )
    .catch((err)=>err)
 }


  async function deleteCartitem(id){
   return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers}).then((res)=>
    res)
    .catch((err)=>err)
 
    
 } 
 function clearCart(){
 return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then((res)=>res)
   .catch((err)=>err)

 
   
   
} 
function updatecartCount(prodId,newCount){
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{count:newCount},{headers})
  .then((res)=>res)
  .catch((err)=>err)
}

 useEffect(()=>{getLoggedusercart()},[])
return <cartcontext.Provider value={{setcartnum, wishlistcheck,setwishlistcheck,wishid,addwishlist,getLoggedtowishlist,removefromwishlist,addProductTowishlist,cartnumowner,cartnum,cartID,clearCart,getProducttocart,getLoggedusercart,deleteCartitem ,updatecartCount ,checkout}}>
    {props.children}
</cartcontext.Provider>
}