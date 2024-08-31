import React, { useState } from 'react'
import style from './Verifyresetcode.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function Verifyresetcode() {
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()

  let formik = useFormik({
    initialValues :{
   
      
      resetCode :'',
    
     
  
    },
  
    onSubmit:handleresetCode,
  })
 async function handleresetCode (values){
    await   axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
    .then((res)=>{
     
   
        
        
       
       navigate('/resetpassword')

        

      console.log(values)
    return res
    })
  
  
    .catch((err)=>{toast.error( 'the code is wrong')
   
   err
    })
    
    
  }
  


  
  return <>
  
<form onSubmit={formik.handleSubmit} class="max-w-sm mx-auto mt-60">
  

    <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a number:</label>
    <input   name="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}
 type="text" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />


   
    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Please introduce the 6 digit code we sent via email.</p>

    <button onClick={()=>handleresetCode()} type="submit" className=" mt-5 me-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {isloading ? <i className='fas fa-spinner fa-spin' ></i> : "send"} </button>
    <Link to={'/forgotpassword'} type="button" className=" me-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">back</Link>

</form>


  
  </>
}
