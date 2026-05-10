import React from 'react'
import Container from '../layouts/Container'
import ReusableNavbar from './ReusableNavbar'
import { megaMenuData } from '../../data/MegaMenu'

const Navbar = () => {
  return (
    <div className='bg-primary '>
      <Container>
        <div className='flex w-full justify-center relative'>
          <div className='group  z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              Home
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.home} />
            </div>
          </div>

          <div className='group z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              TV & Audio
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.TVandAudio} />
            </div>
          </div>

          <div className='group z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              Components
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.component} />
            </div>
          </div>

          <div className='group '>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              Gadgets
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.Gadgets} />
            </div>
          </div>

          <div className='group z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              Laptops & Desktops
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.LaptopAndPc} />
            </div>
          </div>

          <div className='group z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              Cameras & Accessoreis
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.CameraAndAccessories} />
            </div>
          </div>

          <div className='group z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer border-r border-r-gray-400'>
              Smart Phones
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.smartphones} />
            </div>
          </div>

          <div className='group z-50'>
            <span className='font-inter font-semibold block py-3 ps-4 pe-8 text-tcolor cursor-pointer'>
              GPS and Car
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.GpsAndCar} />
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default Navbar