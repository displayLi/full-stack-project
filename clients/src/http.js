import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './router'

axios.defaults.baseURL = 'http://api.link97.com:8085';
axios.defaults.headers['Content-Type'] = 'application/json'

let loading;

function openLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, .7)',
    });
}

function closeLoading() {
    loading.close()
}

axios.interceptors.request.use(
    config => {
        openLoading()
        if (sessionStorage.token) {
            config.headers.Authorization = sessionStorage.token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
        console.log(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        setTimeout(() => {
            closeLoading();
        }, 800)
        return response;
    },
    error => {
        const { status } = error.response;
        if (status == 401) {
            Message({
                showClose: true,
                message: '登录超时，请重新登录!',
                type: 'error'
            });
            sessionStorage.removeItem('token');
            router.push('/login')
        }
        return Promise.reject(error)
    });

export default axios