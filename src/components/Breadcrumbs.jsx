
import React from 'react'
import { Link, useLocation } from 'react-router'
import Container from './layouts/Container';

const Breadcrumbs = () => {
    let direction = useLocation().pathname.split('/')
    let arr = direction.filter(item => item !== '')
    console.log(direction);
    
    const capitalize = (text) =>{
      return  text.charAt(0).toUpperCase() + text.slice(1)
    }
  return (
    <>
    <Container >
        <div className='flex py-6 gap-5'>
        <ul className='flex gap-3'>
            <li className='hover:bg-black/10 rounded'><Link  to='/' className='font-inter tracking-widest '>Home</Link></li>
            {arr.map((item, index)=>{
                let isLast = index === arr.length - 1;
                let href = '/' + arr.slice(0, index + 1).join('/')
                
                
            return(
                 <React.Fragment key={href}>
                <span className='font-bold'>{'>'}</span>
            <li>{isLast ? 
                <span className='font-inter text-[#29323A] tracking-widest'>{capitalize(item)}</span> :
                <Link to={href} className='cursor-pointer bg-gray-200 text-[#29323A] px-3 py-2 rounded-md font-inter hover:bg-black/20 transition-all tracking-widest'>{capitalize(item)}</Link>
              }</li>
              </React.Fragment>

            ) 
        })}
        </ul>
    </div>
    </Container>
    </>
  )
}

export default Breadcrumbs