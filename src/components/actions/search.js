import {refreshTokens} from "./token";
import apiWorker from "../../utils/apiWorker";

export const searchRequest = ( params, token ) => {
    return apiWorker(
        {
            typeRequest: "SEARCH_PENDING",
            typeSuccess: "SEARCH_SUCCSESS",
            typeFail: "SEARCH_FAIL"
        },
        {
            url: "/search",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: "get",
            params: params
        }
    )
}

export const searchClear = () => {
    return(
        {
            type: "SEARCH_CLEAR"
        }
    ) 
}