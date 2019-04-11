import {refreshTokens} from "./token";
import apiWorker from "../../utils/apiWorker";

export const communityRequest = ( token ) => {
    return apiWorker(
        {
            typeRequest: "COMMUN_PENDING",
            typeSuccess: "COMMUN_SUCCSESS",
            typeFail: "COMMUN_FAIL"
        },
        {
            url: "/community",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: "get"
        }
    )
} 