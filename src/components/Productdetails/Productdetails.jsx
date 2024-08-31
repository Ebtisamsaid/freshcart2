import React, { useContext, useEffect } from 'react'
import style from './Productdetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Slider from 'react-slick'
import toast from 'react-hot-toast'
import { cartcontext } from '../../Context/Cartcontext'


export default function Productdetails() {
  const [relatedproduct, setrelatedproduct] = useState([])
  let {setcartnum,getProducttocart,wishlistcheck,removewishlistitem,addtowishlist} =useContext(cartcontext)
  const [isloading, setisloading] = useState(false)
  const [product, setproduct] = useState(null)
  let {id,category}=useParams()

  function getproduct(id){
    setisloading(true)
axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then((res)=>{
  setproduct(res.data.data)
  
  setisloading(false)
})
.catch((res)=>{
console.log(res);
setisloading(false)
})
  }
  async function Addtocart(id) {
    let response = await getProducttocart(id)
console.log(response);
if(response.data.status=='success'){
  toast.success(response.data.status)
  setcartnum(res.data.numOfCartItems)
}else{
  toast.error(response.data.status)
}

    
  }

  function getAllproducts(){
    setisloading(true)
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then((res)=>{
    
     

let related = res.data.data.filter((product) => 
  product.category.name == category
  
).slice(0,4)
console.log(related);

setrelatedproduct(related)
    })
   
    
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 3,
    autoplay:true,
    autoplaySpeed:3000,
  };
  useEffect(()=>{
getproduct(id)
getAllproducts()
  },[id,category])
  return <>
  <div className='row  p-10 mx-auto  items-center mt-10 '>

<div className="w-1/2 md:w-1/4">
<Slider {...settings}>
{product?.images.map((src)=><img src={src} className='w-full' alt="" />)}
</Slider>
</div>
<div className="w-3/4 mt-5">
<h1 className='text-emerald-500 font-bold text-2xl'>{product?.title}</h1>
<h2 className='mt-9 text-lg text-gray-500'>{product?.description}</h2>
<div className="flex justify-between">
<h4>{product?.category.name}</h4>
{/* <Link   to="#" className= " relative flex text-gray-900 dark:text-white  mx-1">
<i onClick={()=>{wishlistcheck.some((i)=>i===product.id)?removewishlistitem(product.id):addtowishlist(product.id)}} className={`${wishlistcheck.some((i)=>i===product.id)? 'text-xl fa-solid fa-heart text-emerald-500':'text-xl fa-regular fa-heart'}`}></i> 
</Link> */}

</div>
<div className="flex justify-between p-5">
<h4>{product?.price} <span className='text-emerald-600 font-bold'>EGP</span></h4> <span> <i className=' fas fa-star text-yellow-500 '></i>{product?.ratingsAverage} </span>


</div>
<button onClick={()=>{Addtocart(product.id)}} className='btn bg-emerald-600 text-white font-serif rounded-xl p-3 pb-2'>Add to Cart</button>
</div>
</div>
<h2 className='p-4 font-semibold text-emerald-900 text-2xl'>Related Product</h2>
{isloading ?<span class="loader"></span>
 :
  <div className='row w-[80%]   mx-auto pb-3 '> {relatedproduct.map((product)=>(<div key={product.id} className='sm:w-[40%] mx-auto md:w-1/4'>
<Link to={`/productdetails/${product.id}/${product.category.name}`}>
<div className="products p-2" onClick={Productdetails}>
<img src={product.imageCover} alt="" className='w-[40%]' />
<h3 className='text-emerald-500'>{product.category.name}</h3>
<h3>{product.title .split(' ').slice(0,2).join(' ')}</h3>
<div className='flex justify-between p-2'><h4>{product.price} EGP</h4> <span> <i className=' fas fa-star text-yellow-500'></i>{product.ratingsAverage} </span></div>


  </div></Link>
  <button  className='btn bg-emerald-700 text-white font-serif rounded-xl p-2 pb-1'>Add to Cart</button>
 </div>))}
 
 </div>


  }
  
  </>
}