import axios from 'axios'

export const inventoryApi = axios.create(
    {
        baseURL: "/api/inventory",
        responseType: "json",
        headers: {
            "Content-Type": "application/json",
        }
    });
