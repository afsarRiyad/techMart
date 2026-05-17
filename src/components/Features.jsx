import React from 'react'
import camera from '../assets/images/features/camera.webp'
import roundcamera from '../assets/images/features/360camera.webp'
import desktop from '../assets/images/features/desktop.webp'
import laptop from '../assets/images/features/laptop.webp'
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router'

const Features = () => {
  return (
    <div className='overflow-x-auto scroll-x-auto font-inter scroll-smooth overflow-y-hidden touch-pan-x'>
      <div className='grid grid-flow-col xl:grid-cols-4 xl:gap-5 lg:gap-6 gap-5 sm:auto-cols-[50%] auto-cols-[95%] pt-8 snap-x snap-mandatory'>
        {/* first features  */}
          <div className='bg-[#F5F5F5] flex pl-3 py-3 lg:w-auto xl:gap-2 gap-8 items-center  snap-start shrink-0 rounded-lg'>
              <div className='w-32 sm:w-40 lg:w-38 xl:45 shrink-0 relative group overflow-hidden'>
                <img draggable={false} src={camera} alt="camera" className='transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform cursor-pointer group-hover:rotate-6' />
                <span className='absolute inset-0 bg-black/5 cursor-pointer group-hover:bg-transparent transition-colors duration-300 ease-in-out'/>
              </div>
            <div className='px-2  min-w-0'>
              <h1 className='sm:text-[17px] text-[16px] text-tcolor uppercase leading-6  '>
                catch the hoteest <span className='font-bold block'>deals </span> in cameras
              </h1>
            <Link className='flex pt-2  gap-2 cursor-pointer items-center select-none active:scale-95 transition-transform duration-150 [WebkitTapHighlightColor:transparent]'>
               <button className='cursor-pointer font-bold text-[14px]'>Shop now </button>
               <div className='lg:w-6 lg:h-6  bg-primary rounded-full flex justify-center items-center'>
                <ChevronRight size={20} strokeWidth={3} className='text-white' />
               </div>
            </Link>
            </div >
          </div>
        {/* second features  */}
          <div className='bg-[#F5F5F5] flex pl-3 py-3 lg:w-auto xl:gap-2 gap-8 items-center  snap-start shrink-0 rounded-lg'>
              <div className='w-32 sm:w-40 lg:w-38 xl:45 shrink-0 relative group overflow-hidden'>
                <img draggable={false} src={desktop} alt="desktop" className='transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform cursor-pointer group-hover:rotate-6' />
                <span className='absolute inset-0 bg-black/5 cursor-pointer group-hover:bg-transparent transition-colors duration-300 ease-in-out'/>
              </div>
            <div className='min-w-0 leading-none'>
              <h1 className='sm:text-[18px]  text-[17px] text-tcolor uppercase leading-5.5 '>
                the new <span className='font-bold block text-[17px]'>360 cameras </span> <span className='text-[15px] pt-1 block'>from</span>
              </h1>
            <Link className='flex  gap-2 cursor-pointer items-center select-none active:scale-95 transition-transform duration-150 [WebkitTapHighlightColor:transparent]'>
               <button className='cursor-pointer font-bold text-[14px]'>
                 <div className='m-0'>
                    <sup className='text-[16px] lg:font-bold font-semibold'>$</sup>
                    <span className=' text-[26px] font-bold'>749</span>
                    <sup className=' text-[16px] lg:font-bold font-semibold'>99</sup>
                 </div>
               </button>
               <div className='lg:w-6 lg:h-6  bg-primary rounded-full flex justify-center items-center'>
                <ChevronRight size={20} strokeWidth={3} className='text-white' />
               </div>
            </Link>
            </div >
          </div>
        {/* third features  */}
          <div className='bg-[#F5F5F5] flex pl-3 py-3 lg:w-auto xl:gap-2 gap-8 items-center  snap-start shrink-0 rounded-lg'>
              <div className='w-32 sm:w-40 lg:w-38 xl:45 shrink-0 relative group overflow-hidden'>
                <img draggable={false} src={laptop} alt="laptop" className='transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform cursor-pointer group-hover:rotate-6' />
                <span className='absolute inset-0 bg-black/5 cursor-pointer group-hover:bg-transparent transition-colors duration-300 ease-in-out'/>
              </div>
            <div className='px-2  min-w-0'>
              <h1 className='sm:text-[18px] text-[16px] overflow-hidden text-tcolor uppercase leading-6  pr-4'>
                tablets, smartphones <span className='font-bold block text-[17px]'>and more </span>
              </h1>
             <Link className='flex  gap-2 cursor-pointer items-center select-none active:scale-95 transition-transform duration-150 [WebkitTapHighlightColor:transparent]'>
               <button className='cursor-pointer font-bold text-[14px]'>
                 <div className='m-0 flex items-center gap-1 pt-1'>
                    <div className='font-inter font-thin text-[15px] leading-none flex flex-col'>
                      <span>UP</span>
                      <span>TO</span>
                    </div>
                    <span className=' text-[26px] font-bold'>70</span>
                    <sup className=' text-[16px] '>%</sup>
                 </div>
               </button>
               <div className='lg:w-6 lg:h-6  bg-primary rounded-full flex justify-center items-center'>
                <ChevronRight size={20} strokeWidth={3} className='text-white' />
               </div>
            </Link>
            </div >
          </div>
        {/* fourth features  */}
           <div className='bg-[#F5F5F5] flex pl-3 py-3 lg:w-auto xl:gap-2 gap-8 items-center  snap-start shrink-0 rounded-lg'>
              <div className='w-32 sm:w-40 lg:w-38 xl:45 shrink-0 relative group overflow-hidden'>
                <img draggable={false} src={roundcamera} alt="roundcamera" className='transform-gpu group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform cursor-pointer group-hover:rotate-6' />
                <span className='absolute inset-0 bg-black/5 cursor-pointer group-hover:bg-transparent transition-colors duration-300 ease-in-out'/>
              </div>
            <div className='px-2  min-w-0'>
              <h1 className='sm:text-[18px] text-[16px] text-tcolor uppercase leading-6  pr-4'>
                the new <span className='font-bold block text-[17px]'>360 cameras </span>
              </h1>
             <Link className='flex  gap-2 cursor-pointer items-center select-none active:scale-95 transition-transform duration-150 [WebkitTapHighlightColor:transparent]'>
               <button className='cursor-pointer font-bold text-[14px]'>
                 <div className='m-0 flex items-center gap-1 pt-1'>
                    <div className='font-inter font-thin text-[15px] leading-none flex flex-col'>
                      <span>UP</span>
                      <span>TO</span>
                    </div>
                    <span className=' text-[26px] font-bold'>70</span>
                    <sup className=' text-[16px] '>%</sup>
                 </div>
               </button>
               <div className='lg:w-6 lg:h-6  bg-primary rounded-full flex justify-center items-center'>
                <ChevronRight size={20} strokeWidth={3} className='text-white' />
               </div>
            </Link>
            </div >
          </div>
      </div>
    </div>
  )
}

export default Features