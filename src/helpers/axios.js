import axios from 'axios'
import { api } from '../urlConfig'
import store from '../store'
import { authConstants } from '../actions/constants';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
})

axiosInstance.interceptors.request.use((req) => {
    const { auth } = store.getState()
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req;
})

axiosInstance.interceptors.request.use((res) => {
    return res;
}, (error)=>{
    console.log(error.response);
    const { status } = error.response;
    if(status === 500 || status === 400){
        localStorage.clear()
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
    return Promise.reject(error);
})

// axiosInstance.interceptors.response.use( // logout user when jwt expires
//     (res) => {
//         return res;
//     },
//     (error) => {
//         console.log(error.response);
//         const status = error.response ? error.response.status : 500;
//         if(status && status === 500) {
//             localStorage.clear();
//             store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
//         }
//         return Promise.reject(error);
//     }
// )

export default axiosInstance