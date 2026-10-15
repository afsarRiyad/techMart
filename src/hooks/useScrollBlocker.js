// Renamed from hooks/scrollBlocker.js to follow the useXxx hook naming convention.
import { useEffect } from "react"


const useScrollBlocker = (enable) => {
    useEffect(() => {
        if (!enable) return

        const { body } = document
        const previousOverflow = body.style.overflow
        const previousPadding = body.style.paddingRight
        const gap = window.innerWidth - document.documentElement.clientWidth

        body.style.overflow = 'hidden'
        if (gap > 0) body.style.paddingRight = `${gap}px`

        return () => {
            body.style.overflow = previousOverflow
            body.style.paddingRight = previousPadding
        }
    }, [enable])
}

export default useScrollBlocker