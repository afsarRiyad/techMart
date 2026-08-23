import React from 'react'
import { Outlet, useLocation } from 'react-router'
import Navbar from '@/components/header/Navbar'
import Topbar from '@/components/header/Topbar'
import Searchbar from '@/components/header/Searchbar'
import FooterTopbar from '@/components/footer/FooterTopbar'
import Footer from '@/components/footer/Footer'
import  Copyright  from '@/components/footer/Copyright'
import MobileFooter from '@/components/footer/MobileFooter'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import DarkMode from '@/components/common/DarkMode'
import SponsorLogo from '@/components/common/SponsorLogo'
import FooterWidget from '@/components/common/FooterWidget'


const  MainLayout= () => {
  let direction = useLocation()
  const dontShow = ['/']
  return (
    <>
    <Topbar/>
    <Searchbar/>
     <Navbar />
     <DarkMode/>
     {!dontShow.includes(location.pathname) && <Breadcrumbs />}
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