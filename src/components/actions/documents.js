import apiWorker from "../../utils/apiWorker";

export const setData =  data => ({type: "DOC_SET", payload: data})

export const documentsRequest = (token) => {
    return apiWorker(
        {
            typeRequest: "DOC_PENDING",
            typeSuccess: "DOC_SUCCSESS",
            typeFail: "DOC_FAIL"
        },
        {
            url: "/documents",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: "get"
        }
    )
} 