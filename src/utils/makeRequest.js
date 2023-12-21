import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://bndlr.cyclic.app/api'

export const makeRequest = axios.create({
    baseURL : BACKEND_URL,
    headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }
});

export const makeAuth = axios.create({
    baseURL : BACKEND_URL,
    headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY },
    withCredentials: true
});