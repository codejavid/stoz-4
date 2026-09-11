
import axios from "axios";

const API_URL = `http://localhost:4000/api`

const api = axios.create({
    baseURL:API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
      console.log("This a error from service api")
      return Promise.reject(error);
    }
)

export default api;
