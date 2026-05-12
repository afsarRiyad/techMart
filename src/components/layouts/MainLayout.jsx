import React from 'react'
import { Outlet, useLocation } from 'react-router'
import Navbar from '../../components/Header/Navbar'
import Topbar from '../../components/Header/Topbar'
import Searchbar from '../../components/Header/Searchbar'
import FooterTopbar from '../footer/FooterTopbar'
import Footer from '../footer/Footer'
import  Copyright  from '../footer/Copyright'
import MobileFooter from '../footer/MobileFooter'
import Breadcrumbs from '../Breadcrumbs'


const  MainLayout= () => {
  let direction = useLocation()
  return (
    <>
    <Topbar/>
    <Searchbar/>
     <Navbar />
    {direction.pathname !== '/' &&  <Breadcrumbs/>}
     <Outlet/>
     <FooterTopbar/>
     <MobileFooter/>
     <Footer/>
     <Copyright/>
    </>
  )
}

export default MainLayout