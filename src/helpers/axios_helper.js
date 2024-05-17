import axios from 'axios';
import { Cookies } from 'react-cookie';

// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'https://api.learn-on-air.site'

axios.defaults.headers.post["Content-type"] = 'application/json'

export const getAuthToken = () => {
    const cookies = new Cookies(); 
    let token = cookies.get('jwt');
    if(!token){
        token = null;
    }
    return token;
}

const getAuthTempToken = () => {
    const cookies = new Cookies(); 
    let token = cookies.get('tempGoogleToken');
    if(!token){
        token = null;
    }
    return token;
}

export const request = (method, url, data) => {
    let headers = {};

    if (getAuthToken('jwt') !== null && getAuthToken('jwt') !== "null"){
        headers = {"Authorization" : `Bearer ${getAuthToken('jwt')}`};
    }


    return axios({
        method : method,
        headers : headers,
        url : url,
        data : data
    })
}

export const googleRequest = async (method, url, googleToken) => {
    let headers = {
        "Authorization": `Bearer ${googleToken}`
    };

    try {
        const response = await axios({
            method: method,
            headers: headers,
            url: url,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const tempRequest = async (method, url, data) => {
    let headers = {};

    if (getAuthTempToken('tempGoogleToken') !== null && getAuthTempToken('tempGoogleToken') !== "null"){
        headers = {"Authorization" : `Bearer ${getAuthTempToken('tempGoogleToken')}`};
    }


    return axios({
        method : method,
        headers : headers,
        url : url,
        data : data
    })
}