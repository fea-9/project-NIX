// import axios from "axios";
import store from "../store"

store.subscribe(() => console.log(store.getState()))

export const authRequest = () => ({
    type: "AUTH_REQUEST",
    status: "PENDING",
    payload: null,
    error: null
})

export const authRequestSuccess = (action) => {
    const { payload} = action
    return ({
        type: "AUTH_REQUEST_SUCCESS",
        status: "RESOLVED",
        payload,
        error: null
    }
)}

export const authRequestFail = (action) => {
    const { error} = action
    return ({
        type: "AUTH_REQUEST_FAIL",
        status: "REJECTED",
        payload: null,
        error
    }
)}

export function resetAuth (){    
    return ({
        type: "AUTH_RESET",
        status: "REJECTED",
        payload: null,
        error: null
    }
)}

/*export function auth ( data, endpoint ) {
    return async function (dispatch){
        dispatch (authRequest())
        try {
            // let payload = await axios({
            //     method: 'POST',
            //     url: `https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0/auth/${endpoint}`,                               
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: data
            // })
            let payload
            let request = new Request ( 
                `https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0/auth/${endpoint}`,
                {
                    method: 'POST',
                    mode: 'cors', 
                    redirect: 'follow', 
                    headers: new Headers({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(data)
                }
            )
            await fetch( request )
                .then ( response => {                    
                    response.json()
                        .then ( x => payload = x  )
                })
            // localStorage.setItem("token", payload.access_token)
            console.log("auth success", payload)
            dispatch (authRequestSuccess({                
                payload}))
        }

        catch(error){
            console.log("error", error)
            dispatch (authRequestFail({                
                error
            }))
        }
    }
}*/

export function authLogout () {
    return function (dispatch){
        localStorage.setItem("access_token", "")
        localStorage.setItem("expires_in", "")
        dispatch(resetAuth())
    }
    
}

export function jsonPost(url, data)
  {
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();   
        x.onerror = () => reject({message: 'Request failed'})        
        x.open("POST", url, true);
        x.setRequestHeader('Content-Type', 'application/json');
        x.send(JSON.stringify(data))

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                resolve(JSON.parse(x.responseText))
            }
            else if (x.readyState == XMLHttpRequest.DONE && x.status != 200){                
                // console.log(x.responseText)
                reject(JSON.parse(x.responseText))
            }
        }
    })
}
export function auth ( userData, endpoint ) {
    return async function (dispatch){
        dispatch (authRequest())
        try {            
            let payload = await jsonPost(
                `https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0/auth/${endpoint}`,                
                   userData                 
            ) 
            localStorage.setItem("access_token", payload.access_token)
            localStorage.setItem("expires_in", payload.expires_in)            
            console.log("auth success", payload)
            dispatch (authRequestSuccess({                
                payload}))
        }

        catch(error){
            console.log("error",error)            
            dispatch (authRequestFail({                
                error
            }))
        }
    }
}


