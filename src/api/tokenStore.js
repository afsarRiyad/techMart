export function crateTokenStore() {
    let accessToken = null
    let refreshInFlight = null

    const getAccessToken = () => accessToken
    const setAccessToken = (token) => {
        accessToken = token
    }
    const clearAccessToken = () => {
        accessToken = null
    }

    const getOrCreateRefresh = (refreshFn) =>{
        if(!refreshInFlight){
            refreshInFlight = refreshFn().finally(()=>{
                refreshInFlight = null
            })
        }
        return refreshInFlight
    }
    return { getAccessToken, setAccessToken, clearAccessToken, getOrCreateRefresh}

}