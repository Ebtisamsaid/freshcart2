import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "Yup"
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'

export default function Login() {
  let{userLogin , setuserLogin}=useContext(UserContext)
  const [apiError,setapiError]=useState('')
  const [isloading, setisloading] = useState(false)
  const navigate=useNavigate()
  const [forgotemail, setemail] = useState('')
  const [ispass, setispass] = useState(false)
async function handleLogin(values) {
  setisloading(true)
  let x = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
  .then((res)=>{console.log(res)
   
    setisloading(false)
    if(res.data.message=='success'){
      setapiError(res.data.message)
      localStorage.setItem('userToken',res.data.token)
      setuserLogin(res.data.token)
      navigate('/')
      
    }})


  .catch((res)=>{console.log(res.response.data.message);
    setisloading(false)
    setapiError(res.response.data.message)
  })
  console.log(values.email)
  setemail(values.email)
}


let schema =yup.object().shape(
  {
    email:yup.string().email('invaild email').required('email is required'),
    
password:yup.string().matches(/^[A-Za-z0-9]{3,6}$/,'password should be between 3-6 char').required('password is required'),

  })
  let formik = useFormik({
    initialValues :{
   
      email :'',
      password :'',
    
     
  
    },
    validationSchema:schema,
    onSubmit:handleLogin,
  })
  


  
  return (
  <>
    <h1 className=' mt-5 text-center font-extrabold text-xl text-emerald-700 '>signin  </h1>
  
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-11">
     <div class="relative z-0 w-full mb-5 group mt-2">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_first_email" className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>
 {formik.errors.email && formik.touched.email ?(<span className='text-red-600'>{formik.errors.email}</span>):null}
  </div>

  <div class="relative z-0 w-full mb-1 group">
    
      <input type={ispass ?'text':'password'}  name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
      <div onClick={()=>setispass(!ispass)} className=' relative left-[93%] bottom-[35px]'>{ ispass ?<i class="fa-regular fa-eye"></i>:<i class="fa-regular fa-eye-slash"></i>}</div>
        {formik.errors.password && formik.touched.password ?(<span className='text-red-600'>{formik.errors.password}</span>):null}

  </div>
  
  
  <Link to={'/forgotpassword'} className='text-emerald-900 underline'>forgot my  password</Link>

  <div> <button type="submit" className="my-3 me-3 text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {isloading ? <i className='fas fa-spinner fa-spin' ></i> : "Login"} </button>
  <Link  to="/register" className='text-emerald-900 underline m-5'>dont  have an account Register now!!</Link>

  
 </div>

{apiError ? <div className= 'w-1/2 bg-red-400 text-white rounded mt-2'>{apiError}</div>:null}
</form>
</>
  )
}
