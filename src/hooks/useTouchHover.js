import { useEffect } from 'react'
const OPEN = 'touch-open'
const CARD = '[data-touch-hover]'

const SWIPE_SLOP = 12

const useTouchHover = () => {
  useEffect(() => {
    let start = null

    const closeOthers = (keep) => {
      document.querySelectorAll(`${CARD}.${OPEN}`).forEach((el) => {
        if (el !== keep) el.classList.remove(OPEN)
      })
    }

    const onPointerDown = (event) => {
      // a real mouse already has hover, leave it alone
      if (event.pointerType === 'mouse') return
      const card = event.target?.closest?.(CARD) ?? null
      // tapping the open card again keeps it open, so the buttons stay usable
      closeOthers(card)
      if (card) card.classList.add(OPEN)
      start = { card, x: event.clientX, y: event.clientY }
    }

    const onPointerUp = (event) => {
      if (!start?.card) return
      const dx = Math.abs(event.clientX - start.x)
      const dy = Math.abs(event.clientY - start.y)
      if (dx > SWIPE_SLOP && dx > dy) start.card.classList.remove(OPEN)
      start = null
    }

    // capture, so swiper's drag handling cannot swallow the tap before we see it
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('pointerup', onPointerUp, true)
    document.addEventListener('pointercancel', onPointerUp, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('pointerup', onPointerUp, true)
      document.removeEventListener('pointercancel', onPointerUp, true)
    }
  }, [])
}

export default useTouchHover
