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
      className='bg-primary dark:bg-yellow-500  hidden lg:block shrink w-full text-white text-sm font-inter relative z-30'
      onMouseLeave={() => setActiveMenu(null)}
    >
      <Container>
        <div className='flex w-full  relative z-50'>
          {navItems.map((item, index)=>(
            <div key={index} className={`py-3 px-4 border-r border-r-gray-400 last:border-r-0 hover:bg-black/10 transition-all  ${activeMenu == index && 'bg-black/10'}`} onMouseEnter={()=> setActiveMenu(index)}>
              <span className='text-sm font-inter text-tcolor font-bold cursor-pointer select-none '>
                {item.label}
                <ChevronDown size={18} className={`inline-block transition-transform duration-300 ${activeMenu == index ? 'rotate-180' : 'rotate-0'}`}/>
              </span>
              <div className={` absolute left-0 right-0 top-10 transition-transform duration-300 ${activeMenu == index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
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