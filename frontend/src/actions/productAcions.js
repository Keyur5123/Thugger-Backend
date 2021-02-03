import {PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS} from "../constants/productConstants"
import axios from "axios"
export const listProducts=()=>async(dispatch)=>{
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
    
        const response =await axios.get("/products");
        
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:response.data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }


}

export const listProductsDetail=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })
    
        const response =await axios.get(`/products/${id}`);
        
        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:response.data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }


}