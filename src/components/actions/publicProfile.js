import {refreshTokens} from "./token";
import apiWorker from "../../utils/apiWorker";


export const publicProfileRequest = (params, token) => {
    return apiWorker(
        {
            typeRequest: "PUBLIC_PROFILE_PENDING",
            typeSuccess: "PUBLIC_PROFILE_SUCCSESS",
            typeFail: "PUBLIC_PROFILE_FAIL"
        },
        {
            url: "/users/object",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: "get",
            params: params
        }
    )
} 