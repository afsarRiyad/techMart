import React from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const Downloads = () => {
  return (
    <div className='bg-primary/90 border-l-4 border-yellow-500 px-4 py-3 flex items-center justify-between'>
      <p className='text-[15px] text-tcolor'>No downloads available yet.</p>
      <Link to='/products' className='text-[15px] font-semibold text-black hover:underline flex items-center gap-1'>
        Browse products <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default Downloads
