import React from 'react'
import Container from '../layouts/Container'
import ReusableNavbar from './ReusableNavbar'
import { megaMenuData } from '../../data/MegaMenu'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='bg-primary hidden lg:flex lg:flex-cols-6 shrink w-full text-white text-sm font-inter relative z-10'>
      <Container>
        <div className='flex w-full justify-center relative'>
          <div className='group  z-40 '>
            <span className='font-inter flex items-center justify-end font-semibold py-3 ps-4 pe-4 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              Home
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.home} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter  flex items-center justify-end  font-semibold  py-3 ps-4 pe-4 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              TV & Audio
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />  
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.TVandAudio} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter  flex items-center justify-end  font-semibold  py-3 ps-4 pe-4 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              Components
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.component} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter flex items-center justify-end  font-semibold  py-3 ps-4 pe-4 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              Gadgets
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.Gadgets} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter flex items-center justify-end  font-semibold  py-3 ps-4 pe-4 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              Laptops & Desktops
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.LaptopAndPc} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter  font-semibold block py-3 ps-4 pe-3 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              Cameras & Accessoreis
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.CameraAndAccessories} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter flex items-center justify-end  font-semibold  py-3 ps-4 pe-4 text-tcolor cursor-pointer border-r border-r-gray-400 hover:bg-black/10 group-hover:bg-black/10'>
              Smart Phones
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
            </span>
            <div className="absolute w-full top-full left-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <ReusableNavbar data={megaMenuData.smartphones} />
            </div>
          </div>

          <div className='group z-40'>
            <span className='font-inter  font-semibold block py-3 ps-4 pe-4 text-tcolor cursor-pointer hover:bg-black/10 group-hover:bg-black/10'>
              GPS and Car
              <ChevronDown size={16} className='inline-block ms-1 mb-1' />
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