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
import CompareBar from '@/components/common/CompareBar'
import MobileQuickActions from '@/components/common/MobileQuickActions'
import { useSyncLocalCompare } from '@/hooks/useSyncLocalCompare'
import { ThemeProvider } from '@/features/theme/ThemeProvider'


const  MainLayout= () => {
  // the real router location, not window.location, so this updates on navigation
  const location = useLocation()
  // hands the guest compare picks to the account once someone is signed in
  useSyncLocalCompare()
  const dontShow = ['/']
  return (
    <ThemeProvider>
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
     <CompareBar/>
     <MobileQuickActions/>
    </ThemeProvider>
  )
}

export default MainLayout