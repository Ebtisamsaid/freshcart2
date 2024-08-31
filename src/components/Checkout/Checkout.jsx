import React from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { cartcontext } from '../../Context/Cartcontext'
export default function Checkout() {
  let{checkout,cartID}=useContext(cartcontext)

console.log(cartID);

  let formik =useFormik({
initialValues:{
  details: "",
        phone :"",
        city: "",
       
},
onSubmit: ()=>handleCheck(cartID,"http://localhost:5173"),
  })
  async function handleCheck(cardID,url){
    let res =await checkout(cardID,url,formik.values)
   
    if(res.data.status =='success'){
      window.location.href = res.data.session.url
    }
   }
  return<>
  
  
<form onSubmit={formik.handleSubmit} class="max-w-sm mx-auto mt-28 border-4 p-3 py-5 border-emerald-600 rounded-xl">

<div>
            <label for="details" class="block mb-2 text-sm font-medium text-emerald-900 dark:text-white">details</label>
            <input name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" id="details" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="details" required />
        </div>
  
    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
            </svg>
        </div>
        <input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id="phone" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="enter your phone" required />
    </div>
    
   
    <div>
            <label for="city" class=" mt-2block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
            <input name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}  type="text" id="city" class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="city" required />
        </div>

        <button type='submit' className='font-bold text-white p-4  bg-emerald-600 w-[50%] rounded-lg relative left-[25%] mt-5'>Pay Now..</button>

</form>


  
  </>
}
