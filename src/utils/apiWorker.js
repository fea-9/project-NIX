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

export default ( endpoint = "", typesReq, config = {method: "GET"} ) => {
    const {typeRequest, typeSuccess, typeFail} = typesReq
    if(!typeRequest || !typeSuccess || !typeFail){
      console.error("Not all actions are given.")
      return
    }
    return async function (dispatch){
        dispatch (get(typeRequest))
        try {

            let payload = await axios(
              {
                url: `https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0${endpoint}`,
                ...config
              }
            )
            dispatch (getRequestSuccess({
                type: typeSuccess,
                payload
            }))
        }

        catch(error){
            dispatch (getRequestFail({
                type: typeFail,
                error
            }))
        }
    }
}
