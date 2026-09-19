// Renamed from hooks/outsideClick.js to follow the useXxx hook naming convention.
import { useEffect } from "react"

// refs can be a single ref or an array of refs (a panel split across two boxes)
const useOutsideClick = (refs, callback, enable) =>{
    useEffect(()=>{
             if(!enable )return
            const handleCLick = (e)=>{
               const list = Array.isArray(refs) ? refs : [refs]
               const inside = list.some((ref) => ref.current?.contains(e.target))
               if(!inside){
                callback()
               }
            }
        document.addEventListener('mousedown', handleCLick)
        return(()=>
         document.removeEventListener('mousedown', handleCLick)
        )
    },[refs, callback, enable])
}


export default useOutsideClick