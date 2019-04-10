import {refreshTokens} from "./token";
import apiWorker from "../../utils/apiWorker";

export const transDocRequest = ( token ) => {
    return apiWorker(
        {
            typeRequest: "TRANS_DOC_PENDING",
            typeSuccess: "TRANS_DOC_SUCCSESS",
            typeFail: "TRANS_DOC_FAIL"
        },
        {
            url: "/keywords",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: "get"
        }
    )
} 