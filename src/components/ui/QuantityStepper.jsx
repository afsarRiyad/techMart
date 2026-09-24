import { Minus, Plus } from 'lucide-react'

// One control for every quantity field on the site. The number keeps its old look
// as the middle slot so the cart rows and the product page do not jump around, and
// the two buttons either side are what most people actually use on a phone.
const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  label = 'Quantity',
  className = '',
}) => {
  const clamp = (next) => {
    if (next < min) return min
    if (max && next > max) return max
    return next
  }

  const step = (delta) => {
    if (disabled) return
    onChange(clamp(value + delta))
  }

  const handleType = (event) => {
    const typed = parseInt(event.target.value, 10)
    if (Number.isNaN(typed)) return
    onChange(clamp(typed))
  }

  // blur pulls the field back to a legal number, so an emptied box cannot leave
  // the row showing nothing while the real quantity stays at one
  const handleBlur = () => {
    if (!value || value < min) onChange(min)
  }

  const button =
    'tapTarget h-9 w-9 shrink-0 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 ' +
    'transition-colors hover:bg-black hover:text-white dark:border-[#444444] dark:text-gray-300 dark:hover:bg-gray-200 ' +
    'dark:hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent ' +
    'disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300'

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <button
        type='button'
        aria-label={`Decrease ${label.toLowerCase()}`}
        className={button}
        onClick={() => step(-1)}
        disabled={disabled || value <= min}
      >
        <Minus size={16} />
      </button>

      <input
        type='number'
        inputMode='numeric'
        aria-label={label}
        value={value}
        onChange={handleType}
        onBlur={handleBlur}
        disabled={disabled}
        min={min}
        max={max}
        className='h-11 w-14 rounded-xl border border-gray-400 px-2 text-center text-[15px] outline-none
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-[#444444] dark:bg-[#242424]
          dark:text-gray-100'
      />

      <button
        type='button'
        aria-label={`Increase ${label.toLowerCase()}`}
        className={button}
        onClick={() => step(1)}
        disabled={disabled || (max ? value >= max : false)}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}

export default QuantityStepper
