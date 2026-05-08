import React from 'react'

const Hamberger = ({className = '' }) => {
  return (
    <div className={`flex flex-col  w-auto gap-[6px] ${className} cursor-pointer`}>
      <span className='w-6 h-[2px] bg-black '> </span>
      <span className='w-6 h-[2px] bg-black '> </span>
      <span className='w-6 h-[2px] bg-black '> </span>
    </div>
  )
}

export default Hamberger