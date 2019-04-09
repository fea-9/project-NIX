import axios from "axios";
import {refreshTokens} from "./token"

const dashRequest = () => ({
    type: "DASH_PENDING",
    payload: null,
    error: null
})

const dashRequestSuccess = ( payload ) => ({
    type: "DASH_SUCCSESS",
    payload: payload,
    error: null
})

const dashRequestFail = () => ({
    type: "DASH_FAIL",
    payload: null,
    error: true
})

export const dashboardRequest = (params, token) => {
    return async function (dispatch){
        dispatch( dashRequest())
        try{
            let data = await axios({
                baseURL: "https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0",
                url: "/stats",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                method: "get",
                params: params
            })
            dispatch(dashRequestSuccess(data))
        } catch (err) {
            dashRequestFail()
        }
    }
} 