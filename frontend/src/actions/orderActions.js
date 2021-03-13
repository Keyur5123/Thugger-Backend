import axios from "axios"
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL } from "../constants/orderConstants"
export const createOrderAction=(order)=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_CREATE_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
    
            const config={
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
        const {data}=await axios.post("/order",order,config)
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    } catch (error) {
            dispatch({
                type:ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            }) 
    }
}

export const detailOrderAction=(id)=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
    
            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
        const {data}=await axios.get(`/order/${id}`,config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
            dispatch({
                type:ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            }) 
    }
}


export const OrderPayAction=(id,paymentResult)=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
    
            const config={
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
        const {data}=await axios.put(`/order/${id}/pay`,paymentResult,config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
            dispatch({
                type:ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            }) 
    }
}

export const OrderMyListAction=()=>async(dispatch,getState)=>{
    try {
        
        dispatch({
            type:ORDER_LIST_MY_REQUEST
        })
        const {userLogin:{userInfo}} =getState()
    
            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
        const {data}=await axios.get(`/order/myorders`,config)
        dispatch({
            type:ORDER_LIST_MY_SUCCESS,
            payload:data
        })
    } catch (error) {
            dispatch({
                type:ORDER_LIST_MY_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            }) 
    }
}