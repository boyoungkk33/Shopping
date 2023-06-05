import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
    '': 'http://localhost:5174'
});



axiosInstance.interceptors.request.use(function(config){
   config.headers.Authorization ='Bearer' + localStorage.getItem('acessToken');
   return config;
},function(error ){
    return Promise.reject(error);
})

export default axiosInstance;
