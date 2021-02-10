import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_UPDATE_PROFILE_FAIL,
     USER_UPDATE_PROFILE_REQUEST,USER_UPDATE_PROFILE_RESET,USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

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


export const getUserDetail=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const response =await axios.get(`/user/${id}`,config);
        
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:response.data
        })   
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const updateUserProfile=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
        const config={
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const response =await axios.put(`/user/profile`,user,config);
        
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:response.data
        })   
    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


