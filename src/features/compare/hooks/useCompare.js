import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { getCompare } from "@/features/compare/services/compareService"
import { readLocalCompare, writeLocalCompare } from "@/features/compare/localCompare"

// the list arrives under `data`; anything else means the call went wrong and an
// empty list is the honest answer rather than `undefined.length`
const listOf = (body) => {
    const list = body?.data
    if (Array.isArray(list)) return list
    if (Array.isArray(list?.items)) return list.items
    return []
}


const withLocal = (serverItems) => {
    const items = Array.isArray(serverItems) ? serverItems : []
    const known = new Set(items.map((item) => item._id))
    const local = readLocalCompare().filter((id) => !known.has(id))
    return [...items, ...local.map((id) => ({ _id: id, pending: true }))]
}

export const useCompare = ()=>{

    const query = useQuery({
        queryKey:["compare"],
        queryFn:getCompare,
        // the api sleeps when idle, a failed load should not leave the count empty
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 4000),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData
    })

    const serverItems = listOf(query.data)

    // once the api returns a pick it is the record of it, so the local copy can go;
    // only picks it has not confirmed stay behind for the next load
    useEffect(() => {
        const confirmed = new Set(listOf(query.data).map((item) => item._id))
        if (confirmed.size === 0) return
        const stored = readLocalCompare()
        const kept = stored.filter((id) => !confirmed.has(id))
        if (kept.length !== stored.length) writeLocalCompare(kept)
    }, [query.data])

    const items = withLocal(serverItems)

    return {
        ...query,
        data: {...query.data, data: items},
        items,
        // nothing on screen yet: no api list and no local picks to show instead
        isPending: query.isPending && items.length === 0
    }
}
