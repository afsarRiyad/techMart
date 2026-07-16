import React from 'react'

const Tooltip = ({title}) => {
  return (
    <div>
       <div className='absolute z-50 left-1/2 -translate-x-1/2 -top-16 mt-5 opacity-0 invisible -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-300 whitespace-nowrap'>
                      <div className='relative bg-black text-white dark:text-t dark:bg-white px-3 py-1.5 text-[14px] rounded-md font-roboto'>
                        {title}
                      </div>
                      <span className='absolute border-t-black border-[10px] border-transparent -translate-x-1/2 left-1/2 -bottom-5 ' />
         </div>
    </div>
  )
}

export default Tooltip
