import React, { useRef, useState } from 'react'
import { menu } from '@/data/navigation'
import { ChevronDown, ChevronUp, Moon, Sun, X  } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Logo from '@/assets/images/logo.svg?react'
import LogoWhite from '@/assets/images/LogoWhite.svg?react'
import useScrollBlocker from '@/hooks/useScrollBlocker';
import { Link } from 'react-router';
import { useTheme } from '@/features/theme/ThemeProvider';

const Hamberger = ({ className = '' }) => {
  const menuRef = useRef(null)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  // the side switch is desktop only, so the drawer carries the phone one
  const { isDark, toggleTheme } = useTheme()
  useOutsideClick(menuRef, () => { setSideDrawerOpen(false); setActiveIndex(null); }, sideDrawerOpen)
  useScrollBlocker(sideDrawerOpen)
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeItem, setActiveItem] = useState('')

  const handleclick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }
  return (
    < >
      <button aria-label="toggle" className={`flex flex-col w-auto gap-[6px] ${className} cursor-pointer`} onClick={() => setSideDrawerOpen(!sideDrawerOpen)}>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen &&'rotate-50 translate-y-2'}`}> </span>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen &&'opacity-0'}`}> </span>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen &&'-rotate-60 -translate-y-2'}`}> </span>
      </button>
      {/* overlay  */}
      {
        sideDrawerOpen &&
        <div className='bg-black/40 fixed inset-0 z-50 h-screen' onClick={()=> setSideDrawerOpen(false)}/>
      }
      <div ref={menuRef} >
        <div className={`fixed inset-0 dark:bg-[#181818] -translate-x-full bg-white h-screen z-50 pb-4 sm:w-100 w-80 transform transition-all ease-in-out duration-300 shadow-xl overflow-y-auto ${sideDrawerOpen &&'translate-x-0'}`}>
          {isDark ?
            <LogoWhite className='w-25 h-auto pt-6 pb-2 px-2' /> :
            <Logo className='w-25 h-auto pt-6 pb-2 px-2' />
          }
          <X aria-label='close menu' className='absolute cursor-pointer right-4 top-6 text-tcolor dark:text-gray-100 dark:text-gray-200' onClick={()=> setSideDrawerOpen(false)}/>
          <button
            type='button'
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className='mx-3 mb-2 mt-1 flex min-h-11 w-[calc(100%-1.5rem)] cursor-pointer items-center justify-between rounded-xl border border-gray-200 px-4 font-inter text-[14px] text-gray-900 dark:text-gray-100 transition-colors duration-200 hover:bg-gray-100 dark:border-[#333333] dark:text-gray-200 dark:hover:bg-[#212121]'
          >
            <span className='flex items-center gap-2'>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? 'Light mode' : 'Dark mode'}
            </span>
            <span aria-hidden='true' className={`relative h-5 w-10 rounded-full transition-colors duration-300 ${isDark ?'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${isDark ?'left-5.5' : 'left-0.5'}`} />
            </span>
          </button>
          <ul>
            {
              menu.map((item, index) => (
                <li key={index} className={`sm:px-3 dark:text-gray-100 px-1 select-none text-[14px] sm:text-[#333E48] text-gray-900 font-inter border-b border-b-gray-200 dark:border-b-[#333333] py-1 ${item.hasChild === false &&'hover:bg-gray-100 hover:text-black dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100 transition-all'} ${activeItem == item && 'bg-primary text-black'}`}>
                  <button aria-label={`Toggle ${item.name}`} className={`flex accordionHeading items-center justify-between cursor-pointer w-full h-[38px] pr-2 transition-all hover:text-black dark:hover:text-gray-100`}  onClick={(e) => { handleclick(index); e.stopPropagation(); setActiveItem(item) }}>
                    {item.name}
                    <span>{item.hasChild === false ? '' : <ChevronDown className={`${activeIndex === index ?'rotate-180' : 'rotate-0'} transform transition-transform duration-300 `} />}</span>
                  </button>
                  {item.children &&
                    <div className={`grid grid-rows-[0fr] opacity-0 transform transition-all ease-in-out duration-300 ${activeIndex === index &&'grid-rows-[1fr] opacity-100 pointer-events-auto'}`}>
                      <div className='overflow-hidden'>
                        <ul className='bg-gray-100 dark:bg-[#1c1c1c] rounded-2xl'>
                          {item.children.map((child, i) => (
                            <li onClick={()=>setSideDrawerOpen(false)} key={i} className={`relative z-10 py-[9px] px-4 border-b border-b-gray-300 last:border-0 cursor-pointer font-inter sm:text-gray-600 sidebarLiHover ${child.isBold &&'font-bold'} border-b border-b-gray-300  cursor-pointer`}>
                              <Link to={'*'}  >
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
