import React from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'



export default function Layout() {
  return <>
<Navbar/>
<Outlet/>
<Footer/>
  </>
}
