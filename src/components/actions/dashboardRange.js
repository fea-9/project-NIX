import {refreshTokens} from "./token"
import apiWorker from "../../utils/apiWorker"


export const dashboardRequest = (params, token) => {
    return apiWorker(
        {
            typeRequest: "DASH_PENDING",
            typeSuccess: "DASH_SUCCSESS",
            typeFail: "DASH_FAIL"
        },
        {
            url: "/stats",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: "get",
            params: params
        }
    )
} 