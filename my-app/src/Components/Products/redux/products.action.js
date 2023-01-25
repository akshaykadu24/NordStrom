import axios from "axios"
import { GET_PRODUCTS_ERROR, GET_PRODUCTS_LOADING, GET_PRODUCTS_SUCCESS, GET_SINGLE_SUCCESS } from "./products.action.types"

export const getProductsData =(page)=> async(dispatch)=>{
    dispatch({type:GET_PRODUCTS_LOADING})
    try{
        let  responce =  await axios(`https://nord-stom-data.vercel.app/Products?_page=${page}&_limit=50`)
        console.log(responce.data)
        dispatch({type:GET_PRODUCTS_SUCCESS,payload:responce.data})
    }catch(error){
        dispatch({type:GET_PRODUCTS_ERROR,payload:error.message})
    }
       
} 

export const getSingleData = (id)=> async(dispatch)=>{
    dispatch({type:GET_PRODUCTS_LOADING})
    try{
        let  responce =  await axios(`https://nord-stom-data.vercel.app/Products/${id}`)
        console.log(responce.data)
        dispatch({type:GET_SINGLE_SUCCESS,payload:responce.data})
    }catch(error){
        dispatch({type:GET_PRODUCTS_ERROR,payload:error.message})
    }
       
} 
