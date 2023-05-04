import axios from 'axios'

export const inventoryApi = axios.create(
    {
        baseURL: "/api/inventory",
        responseType: "json",
        headers: {
            "Content-Type": "application/json",
        }
    });

export const modelTrainApi = axios.create(
    {
        baseURL: "/api",
        responseType: "json",
        headers: {
            "Content-Type": "application/json",
        }
    });

modelTrainApi.interceptors.request.use((config) => {
    console.log(config.url)
    return config;
}, (error) => { return Promise.reject(error); });
