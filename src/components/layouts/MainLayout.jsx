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
import DarkMode from '../DarkMode'
import SponsorLogo from '../SponsorLogo'
import FooterWidget from '../FooterWidget'


const  MainLayout= () => {
  let direction = useLocation()
  return (
    <>
    <Topbar/>
    <Searchbar/>
     <Navbar />
     <DarkMode/>
    {direction.pathname !== '/' &&  <Breadcrumbs/>}
     <Outlet/>
     <SponsorLogo/>
     <FooterWidget/>
     <FooterTopbar/>
     <MobileFooter/>
     <Footer/>
     <Copyright/>
    </>
  )
}

export default MainLayout