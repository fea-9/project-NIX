import store from "../store"
import {jsonPost, authLogout} from "./auth"

store.subscribe(() => console.log(store.getState()))

export function isAccessTokenValid () {
    const accessTokenExpDate = localStorage.getItem("expires_in") - 1
    const nowTime = Math.floor(new Date().getTime() / 1000)
  
    return accessTokenExpDate <= nowTime
}


export const tokenRefreshRequest = () => ({
    type: "TOKEN_REFRESH_REQUEST",
    status: "PENDING",
    payload: null,
    error: null
})

export const tokenRefreshRequestSuccess = (action) => {
    const { payload} = action
    return ({
        type: "TOKEN_REFRESH_REQUEST_SUCCESS",
        status: "RESOLVED",
        payload,
        error: null
    }
)}

export const tokenRefreshRequestFail = (action) => {
    const { error} = action
    return ({
        type: "TOKEN_REFRESH_REQUEST_FAIL",
        status: "REJECTED",
        payload: null,
        error
    }
)}

export function refreshTokens ( refreshToken ) {
    return async function (dispatch){
        dispatch (tokenRefreshRequest())
        try {            
            let payload = await jsonPost(
                `https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0/auth/refresh`,                
                refreshToken                 
            ) 
            localStorage.setItem("access_token", payload.access_token)
            localStorage.setItem("expires_in", payload.expires_in)  
            localStorage.setItem("refresh_token", payload.user.refresh_token)           
            // console.log("refresh success", payload)
            dispatch (tokenRefreshRequestSuccess({                
                payload}))
        }

        catch(error){
            // console.log("refresh error", error)
            authLogout()
        }
    }
}