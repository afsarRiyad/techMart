import React from 'react'
import Container from './../components/layouts/Container';
import { data } from '../data/TermsData';
import { Link } from 'react-router';

const Terms = () => {
  return (
    <>
      <Container className='pt-5 pb-22' >
        <div className='w-full text-center '>
            <h1 className='text-[40px] font-inter  text-tcolor '>Terms and Conditions</h1>
            <p className='mb-4 text-gray-400 text-[14px]'>This Agreement was last modified on 18 February 2016.</p>
        </div>
            <ul>
                {data.map(item => (
                        <li key={item.id} className='text-[25px] font-inter text-[#333E48] pt-10'>
                            {item.title}
                         {item.child?.length > 0 && (
                           <ol className='pt-10 list-decimal px-8'>
                             {item.child.map(child =>(
                                <li key={child.id} className='text-sm text-[#333E48] leading-6'>
                                    {child.title}
                                </li>
                            ))}
                           </ol>
                            )}
                            {item.para?.length > 0 && (
                                <ul className='pt-10'>
                                    <li className='text-sm text-[#333E48] leading-6 inline'>{item.para}</li>
                                    {item.form && (
                                        <Link to='#' className='cursor-pointer font-bold text-sm text-[#333E48] inline ps-1'>
                                            contact form
                                        </Link>
                                    )}
                                </ul>
                            )}
                        </li>
                ))}
            </ul>
      </Container>
    </>
  )
}

export default Terms
