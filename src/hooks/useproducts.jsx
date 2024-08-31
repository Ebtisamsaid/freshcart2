import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useproducts() {
    function getProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      }
       let productInfo= useQuery({
          queryKey:['recentproducts'],
          queryFn:getProducts,
          staleTime:10000,
          retry:4,
          retryDelay:6000,
          refetchInterval:3000,refetchOnWindowFocus:true,
          gcTime:4000,
          select:(data)=>data.data.data
        })
   
  return productInfo
    
}
