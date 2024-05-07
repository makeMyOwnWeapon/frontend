import axios from 'axios';
import { Cookies } from 'react-cookie';

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post["Content-type"] = 'application/json'

export const getAuthToken = () => {
    const cookies = new Cookies(); 
    let token = cookies.get('jwt');
    if(!token){
        token = null;
    }
    return token;
}

// export function getValueInCookie(name){
//     let nameEQ = name + "="; // key와 '='를 연결해줍니다.
//     let ca = document.cookie.split(';'); // 쿠키를 ';' 기준으로 분리하여 배열로 만듭니다.
//     for(let i=0;i < ca.length;i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') c = c.substring(1,c.length); // 문자열 앞의 빈 공간을 제거합니다.
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); // key가 포함된 쿠키 값을 찾으면 값을 반환합니다.
//     }
//     return null; // 찾고자 하는 key의 쿠키가 없을 경우 null을 반환합니다.
// }

// export const setAuthToken = (token) => {
//     window.localStorage.setItem("auth_token", token);
// }

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