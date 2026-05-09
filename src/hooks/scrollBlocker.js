import { useEffect } from "react"

const useScrollBlocker = (enable) => {
    useEffect(()=>{
         if(enable){
            document.body.style.overflow = 'hidden'
         }else{
            document.body.style.overflow = 'auto'
         }
         return ()=>{
            document.body.style.overflow = 'auto'
         }
    }, [enable])
}

export default useScrollBlocker