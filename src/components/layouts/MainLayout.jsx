import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/Header/Navbar'
import Topbar from '../../components/Header/Topbar'
import Searchbar from '../../components/Header/Searchbar'

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