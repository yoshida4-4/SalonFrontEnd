import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5173', // Laravel バックエンドの URL
    baseURL: 'http://127.0.0.1:8000', // Laravel バックエンドの URL
    // withCredentials: true, // クッキーを利用する
    xsrfCookieName:'XSRF-TOKEN',
    xsrfHeaderName:'X-XSRF-TOKEN'
});

export default axiosInstance;