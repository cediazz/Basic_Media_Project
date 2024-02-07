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



export const initialState = {
  categorys:[],
  category: {},
  loading:false,
  error:null,
  message:null,
};



export const categoryListReducers = (state = initialState,action) =>{
  console.log("reducer",action.payload) 
  switch(action.type){
    case CATEGORY_LIST_REQUEST: return {...state,loading:true}
    case CATEGORY_LIST_SUCCESS: return {...state,loading:false,categorys:action.payload}
    case CATEGORY_LIST_FAIL: return {...state,loading:false,error:action.payload}
    default: return state
   }
}


export const categoryDetailsReducers = (state = initialState,action) =>{
  switch(action.type){
    case CATEGORY_DETAILS_REQUEST: return {...state,loading:true}
    case CATEGORY_DETAILS_SUCCESS: return {...state,loading:false,category:action.payload}
    case CATEGORY_DETAILS_FAIL: return {...state,loading:false,error:action.payload}
    default: return state
   }
}

export const categoryDeleteReducers = (state = initialState,action) =>{
  
  switch(action.type){
    case CATEGORY_DELETE_REQUEST: return {...state,loading:true}
    case CATEGORY_DELETE_SUCCESS: return {...state,loading:false,message:action.payload.message,categorys:state.categorys.filter(category => category.id !== action.payload.id)}
    case CATEGORY_DELETE_FAIL: return {...state,loading:false,message:action.payload}
    default: return state
   }
}

