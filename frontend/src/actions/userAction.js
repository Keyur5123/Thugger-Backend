import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants";

export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        const response =await axios.post("/user/login",{email,password},config);
        
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:response.data
        })
        localStorage.setItem("userLoginInfo",JSON.stringify(response.data))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }



}

export const register=(name,email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
        const response =await axios.post("/user",{name,email,password},config);
        
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:response.data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:response.data
        })
        localStorage.setItem("userLoginInfo",JSON.stringify(response.data))
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const logout=()=>(dispatch)=>{
    localStorage.removeItem("userLoginInfo")
    dispatch({
        type:USER_LOGOUT
    })
}
