import React from "react";

import amazonPay from "../../assets/Amazon_Pay_logo.svg.png";
import americanExpress from "../../assets/American-Express-Color.png";
import masterCard from "../../assets/MasterCard_Logo.svg.png";

import googlePlay from "../../assets/en_badge_web_generic.png";
import { useFormik } from "formik";
import * as Yup from "Yup";
import emailjs, { send } from '@emailjs/browser';

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Footer() {
  const navigate=useNavigate()
  function sendData() {
    emailjs.send(
        "service_o22c24c",
        "template_zj5pm2u",
        { usermail: formik.values.usermail },
        {
          publicKey: "q56DSqEnHE62HeOX-",
        }
      )
      .then( 
        () => {  console.log(formik.values.usermail)
          toast.success("Thanks for contact us");
          navigate('/')
        }).catch(()=>toast.error('error'))
      
   
  }

  let validationSchema = Yup.object().shape({
    usermail: Yup.string().required().email(),
  });

  let formik = useFormik({
    initialValues: {
      usermail:"",
    },
    onSubmit: sendData,
    validationSchema,
  });
console.log(formik);

  return (
    <>
      <div className="footer bg-emerald-200 py-8 mt-8">
        <div className="container  mx-auto">
          <h2 className="capitalize text-3xl">Get The FreshCart App</h2>
          <p className="capitalize text-gray-500 my-4">
            We Will Send You a link, open it on your phone to download the app
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="input flex items-center justify-between  flex-wrap md:flex-nowrap gap-4 px-4"
          >
            <input
              type="email"
              className="w-full md:w-[85%] p-2 rounded border-0 focus:outline-none"
              name="usermail"
              placeholder="Email .."
              value={formik.values.usermail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button 
              type="submit"
              className="capitalize w-full md:w-[15%] mx-auto  rounded text-white bg-green-500 hover:bg-green-800 duration-300 text-sm px-4 py-2"
            >
              share app link
            </button>
          </form>

          <div className="flex my-4 items-center justify-between flex-wrap  border-gray-300 border-y py-6">
            <div className="flex items-center justify-center w-full xl:w-auto gap-2 flex-wrap">
              <h3 className="capitalize text-2xl text-center">
                payment partners
              </h3>
              <img src={amazonPay} className="w-20" alt="amazonPay" />
              <img
                src={americanExpress}
                className="w-20"
                alt="americanExpress"
              />
              <img src={masterCard} className="w-20" alt="masterCard" />
            
            </div>
            <div className="flex items-center justify-center w-full xl:w-auto gap-2 flex-wrap">
              <h3 className="capitalize text-2xl text-center">
                get deliveries with freshCart
              </h3>
            
              <img src={googlePlay} className="w-24" alt="googlePlay" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
