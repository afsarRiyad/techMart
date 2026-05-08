import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../pages/Header/Navbar'
import Topbar from '../../pages/Header/Topbar'
import Searchbar from '../../pages/Header/Searchbar'

const  MainLayout= () => {
  return (
    <>
    <Topbar/>
    <Searchbar/>
     <Navbar />
     <Outlet/>
    </>
  )
}

export default MainLayout