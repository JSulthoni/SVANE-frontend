import axios from "axios";
import { SET_BAG } from "../redux/bagSlice";
import { SIGNIN_FAILURE } from "../redux/authenticationSlice";
import useFetch from "../hooks/useFetch";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// This function initialize users cart and wishlist (collectively in a single document)
// after user created an account, cart and wishlist will be initially an empty array
export const CREATE_BAG = (credentials) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/bag/post`,
            { ...credentials }, // using user email from redux as dummy payload, actual credentials is get from cookies.
            { headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }}
            );
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};


// This function gets user's bag and update redux store with the response
export const GET_BAG = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/bag/get`,
            { headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }}
            );

            console.log(res);
            console.log(res.data);
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};

export const UPDATE_BAG = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/bag/put`,
            { ...payload },
            { headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }}
            );
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};