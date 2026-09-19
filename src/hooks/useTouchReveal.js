import { useCallback, useRef, useState } from 'react'

/**
 * Touch screens have no hover, so the card actions (wishlist, compare) never
 * show. A tap on the card opens them instead.
 *
 * The tap that opens them must not also follow the card link, otherwise the
 * page navigates before the user can pick anything, so blockOpeningTap is meant
 * for onClickCapture on the card.
 */
const useTouchReveal = () => {
  const [openId, setOpenId] = useState(null)
  const openIdRef = useRef(null)
  const openedAt = useRef(0)

  const reveal = useCallback((id) => {
    const opening = openIdRef.current !== id
    openIdRef.current = opening ? id : null
    openedAt.current = opening ? Date.now() : 0
    setOpenId(opening ? id : null)
  }, [])

  const blockOpeningTap = useCallback((event) => {
    if (openedAt.current && Date.now() - openedAt.current < 600) {
      openedAt.current = 0
      event.preventDefault()
      event.stopPropagation()
    }
  }, [])

  return { openId, reveal, blockOpeningTap }
}

export default useTouchReveal
