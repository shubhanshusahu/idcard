// import {createStore} from 'redux'; deprecated
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
const store = configureStore({
    reducer:{
        RootRed:rootReducer
    }
})
export default store; 