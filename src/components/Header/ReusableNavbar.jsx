import React from 'react'
import Container from '../layouts/Container'
import { megaMenuData } from './../../data/MegaMenu';
import { Link } from 'react-router';

const ReusableNavbar = ( {data = []} ) => {

  const Img = data.filter(item => item.type == 'img')
  const textLink = data.filter(item => item.type !== 'img')
  const hasImg = Img.length > 0;
  
  return (
    <Container>
      <div className="bg-white p-8 w-full border-t-2  border-amber-400 shadow-xl flex flex-row gap-10  min-h-[420px]">
        <div className={`grid  gap-y-8 gap-x-6 grow ${hasImg ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {
            textLink.map((item)=>(
                <div key={item.id} className='font-inter '>
                    <h2 className='font-bold pb-2 text-[14px] text-[#333e48] uppercase tracking-wide'>
                        {item.title}
                    </h2>
                    <ul>
                        {
                            item.links.map((item, index)=>(
                                  <li key={index} className='  pb-1.5 text-[13px] '>
                                     <Link to={item.url || '#'} className='relative text-gray-700 font-inter cursor-pointer after:absolute after:content-[""] font-medium after:w-0 after:h-[1px] after:bg-black after:-bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:text-black'>
                                       {item.label}
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
                <Link key={index} to={imgItem.image.url || '#'} className='relative overflow-hidden rounded-sm border border-gray-100 group/img '>
                  <img src={imgItem.image.src} alt={imgItem.image.alt} className=' w-full h-auto object-cover group-hover/img:scale-105 transition-transform duration-500'/>
                  <div className='absolute inset-0 bg-black/9 group-hover/img:bg-transparent transition-colors duration-300 '/>
                </Link>
            ))}
         </div>
        }
      </div>
    </Container>
  )
}

export default ReusableNavbar