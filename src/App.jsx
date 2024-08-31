import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Notfound from './components/Notfound/Notfound.jsx'
 import Cart from './components/Cart/Cart.jsx'
 import Products from './components/Products/Products.jsx'
 import Categories from './components/Categories/Categories.jsx'
 import Brands from './components/Brands/Brands.jsx'
 import Login from './components/Login/Login.jsx'
 import Register from './components/Register/Register.jsx'

import UserContextProvider from './Context/UserContext.jsx'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter.jsx'
import Productdetails from './components/Productdetails/Productdetails.jsx'
import {  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Cartcontextprovider, { cartcontext } from './Context/Cartcontext.jsx'
import toast, { Toaster } from 'react-hot-toast';
import Categoryspecific from './components/Categoryspecific/Categoryspecific.jsx'
import SpecificBrands from './components/SpecificBrands/SpecificBrands.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import Allorders from './components/Allorders/Allorders.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import Forgotpassword from './components/Forgotpassword/Forgotpassword.jsx'
import Verifyresetcode from './components/Verifyresetcode/Verifyresetcode.jsx'
import Resetpassword from './components/Resetpassword/Resetpassword.jsx'
import WishlistcontextProvider from './Context/Wishlistcontext.jsx'
import Freshcart from './components/Freshcart/Freshcart.jsx'
import Footer from './components/Footer/Footer.jsx'




function App() {
  let query =new QueryClient()
let x= createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRouter><Home/></ProtectedRouter>},
    {path:'cart',element:<ProtectedRouter><Cart/></ProtectedRouter>},
     {path:'products',element:<ProtectedRouter><Products/></ProtectedRouter>},
     {path:'categories',element:<ProtectedRouter><Categories/></ProtectedRouter>},
     {path:'categories/:name/:id',element:<ProtectedRouter><Categoryspecific/></ProtectedRouter>},
     {path:'brands/:name/:id',element:<ProtectedRouter><SpecificBrands/></ProtectedRouter>},
     {path:'brands',element:<ProtectedRouter><Brands/></ProtectedRouter>},
     {path:'productdetails/:id/:category',element:<ProtectedRouter><Productdetails/></ProtectedRouter>},
     {path:'checkout',element:<ProtectedRouter><Checkout/></ProtectedRouter>},
     {path:'allorders',element:<ProtectedRouter><Allorders/></ProtectedRouter>},
     {path:'wishlist',element:<ProtectedRouter><Wishlist/></ProtectedRouter>},
     {path:'freshcart',element:<ProtectedRouter><Freshcart/></ProtectedRouter>},
     {path:'footer',element:<ProtectedRouter><Footer/></ProtectedRouter>},
    
   
    {path:'*',element:<Notfound/>}
  ]},
  {path:'login',element:<Login/>},
     {path:'register',element:<Register/>},
     {path:'forgotpassword',element:<Forgotpassword/>},
     {path:'verifyresetcode',element:<Verifyresetcode/>},
     {path:'resetpassword',element:<Resetpassword/>},
 ])

  return (
    <>
  
    <UserContextProvider>

  
  <QueryClientProvider client={query}>
    <Cartcontextprovider>
    
   <RouterProvider router={x}></RouterProvider>
   <Toaster/>
  
   </Cartcontextprovider>
   <ReactQueryDevtools/>
   </QueryClientProvider>
  
   </UserContextProvider>
 
    </>
  )
}

export default App
