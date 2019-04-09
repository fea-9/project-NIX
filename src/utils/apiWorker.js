import axios from "axios";

const getRequest = (type) => {
    return {
        type,
        payload: null,
        error: null 
    }
}

const getRequestSuccess = (type, payload) => {
    return ({
        type: type,
        payload: payload,
        error: null
    }
)}

const getRequestFail = (type) => {
    return ({
        type: type,
        payload: null,
        error: true
    }
)}

export default ( typesReq, config = {method: "get"} ) => {
    const {typeRequest, typeSuccess, typeFail} = typesReq
    
    return async function (dispatch){
 
        dispatch (getRequest(typeRequest))
        try {

            let payload = await axios(
              {
                baseURL: "https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0",
                ...config
              }
            )
            
            dispatch (getRequestSuccess(
                typeSuccess,
                payload
            ))
        }

        catch(error){
            dispatch (getRequestFail(
                typeFail
            ))
        }
    }
}
