import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://bndlr.cyclic.app/api';
const API_KEY = import.meta.env.VITE_MONGO_API_KEY;

export const makeRequest = axios.create({
    baseURL : BACKEND_URL,
    headers: { Authorization: 'Bearer ' + API_KEY }
});

export const makeAuth = axios.create({
    baseURL : BACKEND_URL,
    headers: { Authorization: 'Bearer ' + API_KEY },
    withCredentials: true
});