import axios from "axios";

const getRequest = (type) => ({
    type,
    status: "PENDING",
    payload: null,
    error: null
})

const getRequestSuccess = (action) => {
    const {type, payload} = action
    return ({
        type,
        status: "RESOLVED",
        payload,
        error: null
    }
)}

const getRequestFail = (action) => {
    const {type, error} = action
    return ({
        type,
        status: "REJECTED",
        payload: null,
        error
    }
)}

export function get ( config, typesReq ) {
    const {typeRequest, typeSuccess, typeFail} = typesReq
    return async function (dispatch){
        dispatch (getRequest(typeRequest))
        try {
            let payload = await axios(`${url}/${id}`,
                config
            )
            dispatch (getRequestSuccess({
                type: typeSuccess,
                payload}))
        }

        catch(error){
            dispatch (getRequestFail({
                type: typeFail,
                error
            }))
        }
    }
}
