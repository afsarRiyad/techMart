import { Check, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'

const ActionToast = ({ id, title, cta, to }) => (
  <div className='actionToast'>
    <div className='flex items-start gap-3 px-4 pt-3.5 pb-3'>
      <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-tcolor'>
        <Check size={15} strokeWidth={3} />
      </span>
      <p className='flex-1 text-[15px] font-medium leading-snug'>{title}</p>
      <button
        type='button'
        aria-label='Dismiss'
        onClick={() => toast.dismiss(id)}
        className='-mt-0.5 -mr-1 cursor-pointer rounded-full p-1 opacity-60 transition-opacity hover:opacity-100'
      >
        <X size={16} />
      </button>
    </div>
    <Link to={to} onClick={() => toast.dismiss(id)} className='actionToastGo'>
      {cta}
      <ArrowRight size={17} className='actionToastArrow' />
    </Link>
    <span className='actionToastBar' />
  </div>
)

export default ActionToast
