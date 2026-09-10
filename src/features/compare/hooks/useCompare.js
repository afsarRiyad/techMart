import { useQuery } from "@tanstack/react-query"
import { getCompare } from "@/features/compare/services/compareService"

export const useCompare = ()=>{
    return useQuery({
        queryKey:["compare"],
        queryFn:getCompare,
        retry: false,
        staleTime: 1000 * 60 * 5
    })
}