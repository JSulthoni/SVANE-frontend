import axios from "axios";

export const makeRequest = axios.create({
    baseURL : 'https://bndlr.cyclic.app',
    headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }
});