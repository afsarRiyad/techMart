import { useTheme } from '@/features/theme/ThemeProvider'

// Desktop only: the switch lives at the left edge of the page. Phones get the
// same switch inside the hamburger menu instead.
const DarkMode = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className='fixed lg:left-0 top-1/2 hidden lg:block z-20 h-30 w-13 rounded-full gony-roboto'>
      <input
        id='dark-mode-toggle'
        aria-label='toggle dark mode'
        className='myInput'
        checked={isDark}
        onChange={toggleTheme}
        type='checkbox'
      />
      <label htmlFor='dark-mode-toggle' className='myLabel' />
    </div>
  )
}

export default DarkMode
