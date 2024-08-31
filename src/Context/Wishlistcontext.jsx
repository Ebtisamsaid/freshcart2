import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
 export let wishlistcontext=createContext()
export default function WishlistcontextProvider(props) {
    const [addwishlist, setaddwishlist] = useState(null)
const [wishid, setwishid] = useState(null)

    let{userLogin , setuserLogin}=useContext(UserContext)
    let headers ={token:localStorage.getItem('userToken')}
function removefromwishlist(id){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
  .then((res)=>res).catch((err)=>err)}


  function addProductTowishlist(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:productId},{headers})
      .then((res)=> 
        
          {
            setwishid(productId)
           return res}).catch((err)=>err)
    
  }
  function getLoggedtowishlist(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers})
    .then((res)=>{
      
      if(res.data.status=='success'){
        setaddwishlist(res.data.data)
        removefromwishlist(id)
      }
    return  res
    }
    )
    .catch((err)=>err)
  }
  useEffect(()=>{if(localStorage.getItem('userToken')){
    setuserLogin(true)
   
  }
else{
    setuserLogin(false)
}},[])
  return <wishlistcontext.Provider value={{getLoggedtowishlist,removefromwishlist,wishlistcontext,addProductTowishlist}}>

    {props.children}
  </wishlistcontext.Provider>
   
  
}
