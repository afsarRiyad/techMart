import { useEffect, useState } from 'react'

// holds the value until it stops changing for `delay` ms
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}

export default useDebounced
