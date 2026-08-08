import { useQuery } from "@tanstack/react-query"
import { getAddress } from "../services/addressService"

export const useAddresses = ()=>{
    return useQuery({
        queryKey: ["addresses"],
        queryFn: getAddress,
        retry: false,
            staleTime: 5 * 60 * 1000,
    })
}