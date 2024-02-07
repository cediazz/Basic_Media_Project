import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { categoryListReducers, categoryDetailsReducers, categoryDeleteReducers } from './reducers/categoryReducers'
import { configureStore } from '@reduxjs/toolkit'
import categoryReducers from './reducers/categoryReducers'
import { initialState } from './reducers/categoryReducers'

const reducerCategory = combineReducers({
    categoryList:categoryListReducers,
    categoryDetails:categoryDetailsReducers,
    categoryDelete : categoryDeleteReducers,
})

 const store = configureStore({
    reducer: reducerCategory,
  })
  //store.subscribe(()=>console.log(store))


//const inicialState = {}

const middleware = [thunk]

//const store = createStore(reducerCategory,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store