import React, { useRef, useState } from 'react'
import { menu } from '../data/Navigation'
import { ChevronDown, ChevronUp, X  } from 'lucide-react';
import useOutsideClick from '../hooks/outsideClick';
import Logo from '../assets/images/logo.svg?react'
import useScrollBlocker from '../hooks/scrollBlocker';
import { Link } from 'react-router';

const Hamberger = ({ className = '' }) => {
  const menuRef = useRef(null)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  useOutsideClick(menuRef, () => { setSideDrawerOpen(false); setActiveIndex(null); }, sideDrawerOpen)
  useScrollBlocker(sideDrawerOpen)
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeItem, setActiveItem] = useState('')

  const handleclick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
  return (
    < >
      <button aria-label="toggle" className={`flex flex-col  w-auto gap-[6px] ${className} cursor-pointer`} onClick={() => setSideDrawerOpen(!sideDrawerOpen)}>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen && 'rotate-50 translate-y-2'}`}> </span>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen && 'opacity-0'}`}> </span>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen && '-rotate-60 -translate-y-2'}`}> </span>
      </button>
      {/* overlay  */}
      {
        sideDrawerOpen &&
        <div className='bg-black/40 fixed inset-0 z-50 h-screen' onClick={()=> setSideDrawerOpen(false)}/>
      }
      <div ref={menuRef} >
        <div className={`fixed inset-0 -translate-x-full bg-white h-screen z-50 pb-4 sm:w-100 w-80 transform transition-all ease-in-out duration-300 shadow-xl overflow-y-auto ${sideDrawerOpen && 'translate-x-0'}`}>
          <Logo className='w-25 h-auto pt-6 pb-2 px-2' /> <X className='absolute cursor-pointer right-4 top-6' onClick={()=> setSideDrawerOpen(false)}/>
          <ul>
            {
              menu.map((item, index) => (
                <li key={index} className={`sm:px-3 px-1 select-none text-[14px] sm:text-[#333E48] text-gray-900 font-inter border-b border-b-gray-200  py-1 ${item.hasChild === false && 'hover:bg-gray-100 hover:text-black transition-all'} ${activeItem == item && 'bg-[#FED700] text-black'}`}>
                  <button aria-label={`Toggle ${item.name}`} className={`flex accordionHeading items-center justify-between cursor-pointer w-full h-[38px] pr-2  transition-all hover:text-black`}  onClick={(e) => { handleclick(index); e.stopPropagation(); setActiveItem(item) }}>
                    {item.name}
                    <span>{item.hasChild === false ? '' : <ChevronDown className={`${activeIndex === index ? 'rotate-180' : 'rotate-0'} transform transition-transform duration-300 `} />}</span>
                  </button>
                  {item.children &&
                    <div className={`grid grid-rows-[0fr] opacity-0  transform transition-all ease-in-out duration-300 ${activeIndex === index && 'grid-rows-[1fr] opacity-100 pointer-events-auto'}`}>
                      <div className='overflow-hidden'>
                        <ul className='bg-gray-100   rounded-2xl '>
                          {item.children.map((child, i) => (
                            <li key={i} className={`relative z-10 py-[9px] px-4 border-b border-b-gray-300 last:border-0 cursor-pointer font-inter sm:text-gray-600 sidebarLiHover ${child.isBold && 'font-bold'} border-b border-b-gray-300  cursor-pointer`}>
                              <Link to={child.url || '#'}>
                              {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  }

                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Hamberger