import React from 'react'
import Container from '../layouts/Container'
import { Link } from 'react-router';
import { memo } from 'react'

const ReusableNavbar = memo(( {data = []} ) => {

  const Img = data.filter(item => item.type == 'img')
  const textLink = data.filter(item => item.type !== 'img')
  const hasImg = Img.length > 0;
  
  return (
    <Container>
      <div className="bg-white p-8 w-full border-t-2 dark:bg-[#181818]  border-amber-400 shadow-xl flex flex-row gap-10  min-h-[420px]">
        <div className={`grid  gap-y-8 gap-x-6 grow ${hasImg ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {
            textLink.map((item, index)=>(
                <div key={item.id} className='font-inter '>
                    <h2 className='font-bold pb-2 text-[14px] dark:text-gray-200 text-[#333e48] uppercase tracking-wide'>
                        {item.title}
                  </h2>
                    <ul>
                        {
                            item.links.map((link, index)=>(
                                  <li key={link.label} className='  pb-1.5 text-[13px] '>
                                     <Link to={link.url || '#'} className='relative dark:text-gray-300 text-gray-700 font-inter cursor-pointer after:absolute after:content-[""] font-medium after:w-0 after:h-[1px] after:bg-black dark:after:bg-white after:-bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-black dark:hover:text-white'>
                                       {link.label}
                                    </Link>
                                 </li>
                            ))
                        }
                    </ul>
                </div>
            ))
          }
        </div>
        {hasImg &&
         <div className='w-[260px] h-auto flex flex-col gap-4 shrink-0 items-center justify-center'>
            {Img.map((imgItem, index)=>(
                <Link key={imgItem.image.src} to={imgItem.image.url || '#'} className='relative overflow-hidden rounded-sm border border-gray-100 group/img '>
                  <img src={imgItem.image.src} alt={imgItem.image.alt} className=' w-full h-auto object-cover group-hover/img:scale-105 transition-transform duration-500'/>
                  <div className='absolute inset-0 dark:bg-white/9 bg-black/9 group-hover/img:bg-transparent transition-colors duration-300 '/>
                </Link>
            ))}
         </div>
        }
      </div>
    </Container>
  )
})

export default ReusableNavbar