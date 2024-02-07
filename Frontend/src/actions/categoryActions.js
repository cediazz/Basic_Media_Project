import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,   
} from "../constants/categoryConstants"
import axios from 'axios'



export const listCategorys = () => async (dispatch) =>{
   
    try{
        dispatch({type:CATEGORY_LIST_REQUEST})
        let {data} = await axios.get('http://127.0.0.1:8000/Categorys/')
        console.log("Action", data)
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }

}

export const categoryDetail = (id) => async (dispatch) =>{
    
    try{
        dispatch({type:CATEGORY_DETAILS_REQUEST})
        const {data} = await axios.get(`http://127.0.0.1:8000/Categorys/${id}`)
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })
        
    }
    catch(error){
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }

}


export const categoryDelete = (id) => async (dispatch) =>{
   
    try{
        dispatch({type:CATEGORY_DELETE_REQUEST})
        const data = await axios.delete(`http://127.0.0.1:8000/Categorys/${id}`)
       
        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: {message:"Categoría eliminada",id:id}
        })
     
        
    }catch(error){
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.code = "ERR_NETWORK" && error.response.data.message ?
            error.response.data.message : error.code = "ERR_BAD_RESPONSE" && "No se pudo eliminar la categoría porque esta relacionada con un Medio"
        })
    }

}