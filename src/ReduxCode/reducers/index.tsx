// import {combineReducers} from 'redux';
import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
// import {data} from  '../component/fixedData'
let device='' ;
const DeviceDetect= ()=>{
if(window.innerWidth<=768)
{
    return 'mobile'
}
else
{
   return 'desktop'
}

}

const initialState={
    username:null,
    user :null,
    sidebar:false,
    companyID:'qwe123',
    device:DeviceDetect(),
    mobileForPtReg:'',
    currentPatient:null,
    currentDoctor:null,
    currentCompany:null,
    currentSite:null,
    currentAppointment:null,
    schoolList:[],
}
const userlogin = createAction<number>("userlogin");
const getSchools = createAction<number>("getSchools");

const togglenavbar = createAction<number>("togglenavbar");

const rootReducer = createReducer(initialState,(builder) => {
    builder
   
    .addCase(userlogin, (state, action:any) => {
        // action is inferred correctly here
       state.user = action.payload;
        })
    .addCase(getSchools, (state, action:any) => {
        state.schoolList = action.payload;
            })
    .addCase(togglenavbar, (state, action:any) => {
        state.sidebar = !state.sidebar;
     })
})

export default rootReducer;