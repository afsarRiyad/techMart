import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { pushLocalCompare, readLocalCompare } from '@/features/compare/localCompare'

// Guest compare picks live in localstorage. The moment an account is signed in
// they are posted to /api/compare, so the account owns the list from then on.
export const useSyncLocalCompare = () => {
  const queryClient = useQueryClient()
  const { data: me } = useAuth()
  const signedIn = Boolean(me?.data?._id)
  const running = useRef(false)

  useEffect(() => {
    if (!signedIn || running.current) return
    if (!readLocalCompare().length) return
    running.current = true
    pushLocalCompare().finally(() => {
      running.current = false
      queryClient.invalidateQueries({ queryKey: ['compare'] })
    })
  }, [signedIn, queryClient])
}
