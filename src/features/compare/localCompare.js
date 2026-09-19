import { apiCustomer } from '@/api/apiCustomer'

const KEY = 'techmart_compare'

// The guest compare list, product ids only, kept in localstorage so the count
// never waits on (or fails with) an api call. On login it is handed to the
// account and dropped.

export const readLocalCompare = () => {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list.filter((id) => typeof id === 'string' && id) : []
  } catch {
    return []
  }
}

export const writeLocalCompare = (ids) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // storage blocked or full, the api list still works
  }
  return ids
}

export const addLocalCompare = (productId) =>
  productId
    ? writeLocalCompare([productId, ...readLocalCompare().filter((id) => id !== productId)])
    : readLocalCompare()

export const removeLocalCompare = (productId) =>
  writeLocalCompare(readLocalCompare().filter((id) => id !== productId))

export const clearLocalCompare = () => {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing to clear
  }
}

// login: hand the guest picks to the account, the api owns them from then on
export const pushLocalCompare = async () => {
  const ids = readLocalCompare()
  if (!ids.length) return { pushed: 0, kept: 0 }

  let pushed = 0
  let unreachable = false

  for (const productId of ids) {
    try {
      await apiCustomer.post('/api/compare', { productId })
      pushed += 1
    } catch (error) {
      // a 4xx means the api already has this one, a network or server error
      // means the list should stay so it can be tried again
      const status = error.response?.status
      if (!status || status >= 500) unreachable = true
    }
  }

  if (!unreachable) clearLocalCompare()
  return { pushed, kept: unreachable ? ids.length - pushed : 0 }
}
