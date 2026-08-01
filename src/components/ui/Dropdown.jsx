import React, { useState } from 'react'

const Dropdown = ({title, children, titleCls='', icon}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () =>{
        setIsOpen(prev => !prev)
    }

  return (
    <section >
        <button onClick={handleClick} className={`${titleCls} outline-none select-none flex items-center`}>
            {title} {icon}
        </button>
        <div className={`${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid verflow-hidden transition-all duration-1200 ease-in-out `}>
          <div className="overflow-hidden">
            {children}
          </div>
        </div>
    </section>
  )
}

export default Dropdown
