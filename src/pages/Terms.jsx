import React from 'react'
import Container from './../components/layouts/Container';
import { data } from '../data/TermsData';
import { Link } from 'react-router';

const Terms = () => {
  return (
    <>
      <Container className='pt-5 pb-22' >
       <div role='main'>
         <div className='w-full text-center '>
            <h1 className='md:text-[40px] text-[28px] font-inter  text-tcolor dark:text-white'>Terms and Conditions</h1>
            <p className='mb-4 text-gray-500 text-[14px]'>This Agreement was last modified on 18 February 2016.</p>
        </div>
            <ul>
                {data.map(item => (
                        <li key={item.id} className='md:text-[25px] text-[22px] font-inter text-[#333E48] pt-10 dark:text-white'>
                            {item.title}
                         {item.child?.length > 0 && (
                           <ul className='md:pt-10 pt-7 list-decimal px-8 '>
                             {item.child.map(child =>(
                                <li key={child.id} className='text-sm text-[#333E48] leading-6 dark:text-gray-300'>
                                    {child.title}
                                </li>
                            ))}
                           </ul>
                            )}
                            {item.para?.length > 0 && (
                                <div className='md:pt-10 pt-7 '>
                                    <p className='text-sm text-[#333E48] leading-6 inline-block dark:text-gray-300'>
                                        {item.para}
                                    </p>
                                    {item.form && (
                                        <Link to='#' className='cursor-pointer font-bold text-sm text-[#333E48] inline md:ps-1 dark:text-red-700 hover:underline'>
                                            contact form
                                        </Link>
                                    )}
                                </div>
                            )}
                        </li>
                ))}
            </ul>
       </div>
      </Container>
    </>
  )
}

export default Terms
