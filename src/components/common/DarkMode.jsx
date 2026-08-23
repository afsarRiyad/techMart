import React, { useEffect, useState } from 'react'

const DarkMode = () => {
  const [theme, setTheme] = useState(()=>{
      return  localStorage.getItem(('theme') || 'light')
  })
  useEffect(()=>{
         let html = document.documentElement
        if(theme === 'dark'){
          html.classList.add('dark')
        }else{
          html.classList.remove('dark')
        }
         localStorage.setItem('theme', theme)

  },[theme])
 const handleTheme = () =>{
      setTheme(prev => prev === 'dark' ? 'light' : 'dark')
 } 

  return (
    <>
    <div className='fixed lg:left-10 top-1/2 hidden lg:block z-20 h-30 w-13 rounded-full gony-roboto' >
    <input id="dark-mode-toggle" aria-label='toggle dark mode'  className='myInput' checked={theme === 'dark'} type="checkbox" readOnly/>
      <label htmlFor="dark-mode-toggle" className='myLabel ' onClick={handleTheme}> 
    </label>
    </div>
    </>
  )
}

export default DarkMode