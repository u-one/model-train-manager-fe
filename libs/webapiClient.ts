import axios from 'axios'

export const trainModelApi = axios.create(
    {
        baseURL: "/api/trainmodel",
        responseType: "json",
        headers: {
            "Content-Type": "application/json",
        }
    });
