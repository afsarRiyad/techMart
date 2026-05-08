import { useEffect } from "react"

const useOutsideClick = (ref, callback, enable) =>{
    useEffect(()=>{
             if(!enable )return
            const handleCLick = (e)=>{
               if(ref.current && !ref.current.contains(e.target)){
                callback()
               }
            }
        document.addEventListener('mousedown', handleCLick)
        return(()=>
         document.removeEventListener('mousedown', handleCLick)
        )
    },[ref, callback, enable])
}


export default useOutsideClick