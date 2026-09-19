import { useQuery } from "@tanstack/react-query"
import { getCompare } from "@/features/compare/services/compareService"
import { useAuth } from "@/hooks/useAuth"
import { readLocalCompare } from "@/features/compare/localCompare"

// guest picks the api has not confirmed yet, shown without their image
const withLocal = (serverItems) => {
    const items = Array.isArray(serverItems) ? serverItems : []
    const known = new Set(items.map((item) => item._id))
    const local = readLocalCompare().filter((id) => !known.has(id))
    return [...items, ...local.map((id) => ({ _id: id, pending: true }))]
}

export const useCompare = ()=>{
    const { data: me } = useAuth()
    const signedIn = Boolean(me?.data?._id)

    const query = useQuery({
        queryKey:["compare"],
        queryFn:getCompare,
        // the api sleeps when idle, a failed load should not leave the count empty
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 4000),
        staleTime: 1000 * 60
    })

    // signed in the account owns the list, as a guest localstorage is the record
    const items = signedIn ? (query.data?.data ?? []) : withLocal(query.data?.data)
    const data = signedIn ? query.data : {...query.data, data: items}

    return {
        ...query,
        data,
        items,
        // a guest with local picks has something to show, no need to wait
        isPending: query.isPending && items.length === 0
    }
}
