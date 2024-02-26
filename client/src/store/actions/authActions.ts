import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import ENV from "../../env.config";
// import { IUser, IUserAuth, IUserSignin } from "../../types/auth";


// export const createUser = createAsyncThunk<IUser, IUserAuth, {rejectValue: string}>(
//     'users/createUser',
//     async function (userData, {rejectWithValue}) {
//         console.log(userData)
//         try {
//         const res = await axios.post(`${ENV.API_URL}api/create-user/`, userData, {
//             headers: { 'Content-Type': 'application/json'},
//         });
//         return res.data 
//         } catch (error: any) {
           
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             } 
//         }
//     });
 
// export const authUser = createAsyncThunk<IUserSignin, IUserAuth, {rejectValue: string}> (
//     'users/authUser',
//     async function(userData, {rejectWithValue}) {
//         try {
//             const res = await axios.post(`${ENV.API_URL}api/auth/`, userData, {
//                 headers: { 'Content-Type': 'application/json'},
//                 withCredentials: true
                
//             });
//             localStorage.setItem('accessToken', res.data.token)
//             return res.data
//         } catch (error: any) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             } 
//         }
//     }
// )
// export const  checkValidToken = createAsyncThunk<string, string, {rejectValue: string}> (
//     'user/checkValidToken',
//     async function (token, {rejectWithValue},) {
//         try {
//             console.log(token)
//             const res = await axios.post(`${ENV.API_URL}api/check-token/`, token, {
//                 headers: { 'Content-Type': 'application/json'},
//                 withCredentials: true
//             })
//             return res.data
            
//         } catch (error: any) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             } 
//         }
//     }
// )