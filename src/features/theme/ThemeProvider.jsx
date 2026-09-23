import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'theme'

const ThemeContext = createContext(null)

const readSaved = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    // storage blocked or unavailable
    return null
  }
}

// light is the default: a machine set to dark mode no longer silently opens the
// shop in dark, only the switch (or a saved choice) does that
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => readSaved() ?? 'light')
  // once the visitor picks a side we stop following the system
  const hasChosen = useRef(readSaved() !== null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    if (hasChosen.current) {
      try {
        localStorage.setItem(STORAGE_KEY, theme)
      } catch {
        // storage blocked, the class on <html> still switches
      }
    }
  }, [theme])

  // two tabs open, one of them toggles
  useEffect(() => {
    const sync = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return
      hasChosen.current = true
      setTheme(event.newValue === 'dark' ? 'dark' : 'light')
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const toggleTheme = useCallback(() => {
    hasChosen.current = true
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggleTheme, setTheme }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme has to be used inside ThemeProvider')
  return context
}

export default ThemeProvider
