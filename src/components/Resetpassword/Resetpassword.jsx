import React, { useState } from 'react'
import style from './Resetpassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Resetpassword() {
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()
  const [ispass, setispass] = useState(false)
async function handleReset(values){
  let x = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
  .then((res)=>{console.log(res)
   
    setisloading(false)
   
    toast.success('success')
  
      navigate('/login')
      
    
  return res})


  .catch((err)=>{
  toast.error('error')
   err
  })
 
}



  let formik = useFormik({
    initialValues :{
   
      email :'',
      newPassword :'',
    
     
  
    },
  
    onSubmit:handleReset,
  })
  return <>
  
  
  <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-20">
     <div class="relative z-0 w-full mb-5 group mt-2">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_first_email" className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>
 {formik.errors.email && formik.touched.email ?(<span className='text-red-600'>{formik.errors.email}</span>):null}
  </div>

  <div class="relative z-0 w-full mb-1 group">
      <input type={ispass ?'text':'password'}  name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
     
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">newPassword</label>
      <div onClick={()=>setispass(!ispass)} className=' relative left-[93%] bottom-[35px]'>{ ispass ?<i class="fa-regular fa-eye"></i>:<i class="fa-regular fa-eye-slash"></i>}</div>

  {formik.errors.newPassword && formik.touched.newPassword ?(<span className='text-red-600'>{formik.errors.newPassword}</span>):null}
  </div>

  <div>  <button onClick={()=>handleReset()} type="submit" className=" me-3 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {isloading ? <i className='fas fa-spinner fa-spin' ></i> : "Reset"} </button>
  <Link to={'/verifyresetcode'} type="button" className=" me-3 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">back</Link>

  
 </div>

</form>


  
  </>
  
  
}
