import React, { useState } from 'react'
import Container from '../layouts/Container'
import ReusableNavbar from './ReusableNavbar'
import { megaMenuData } from '../../data/MegaMenu'
import { ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Home', data: megaMenuData.home },
  { label: 'TV & Audio', data: megaMenuData.TVandAudio },
  { label: 'Components', data: megaMenuData.component },
  { label: 'Gadgets', data: megaMenuData.Gadgets },
  { label: 'Laptops & Desktops', data: megaMenuData.LaptopAndPc },
  { label: 'Cameras & Accessories', data: megaMenuData.CameraAndAccessories },
  { label: 'Smart Phones', data: megaMenuData.smartphones },
  { label: 'GPS and Car', data: megaMenuData.GpsAndCar },
]

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null)

  return (
    <div
      className='bg-primary hidden lg:flex lg:flex-cols-6 shrink w-full text-white text-sm font-inter relative z-10'
      onMouseLeave={() => setActiveMenu(null)}
    >
      <Container>
        <div className='flex w-full justify-center relative'>
          {navItems.map((item, index)=>(
            <div className={`py-2 px-3 border-r border-r-gray-400 last:border-r-0 hover:bg-black/10 transition-all duration-150 ${activeMenu == index && 'bg-black/10'}`} onMouseEnter={()=> setActiveMenu(index)}>
              <span className='text-base font-inter text-tcolor font-bold cursor-pointer '>
                {item.label}
                <ChevronDown size={18} className={`inline-block ml-1 transition-transform duration-300 ${activeMenu == index ? 'rotate-180' : 'rotate-0'}`}/>
              </span>
              <div className={` fixed left-0 right-0 top-auto transition-transform duration-200 ${activeMenu == index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
                <ReusableNavbar data={item.data}/>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Navbar