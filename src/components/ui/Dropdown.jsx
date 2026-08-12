import React, { useState } from 'react'

const Dropdown = ({title, children, titleCls='', icon, duration, subtitle,subCls, icon2}) => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () =>{
        setIsOpen(prev => !prev)
    }

  return (
    <section >
        <button onClick={handleClick} className={`${titleCls}  outline-none font-pop select-none flex items-center`}>
          <span>{subtitle}</span>  <span className={`${subCls} pr-5`}>{title}</span> {isOpen ? icon2 : icon}
        </button>
        <div className={`${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid verflow-hidden transition-all ${duration} ease-in-out `}>
          <div className="overflow-hidden">
            {children}
          </div>
        </div>
    </section>
  )
}

export default Dropdown
