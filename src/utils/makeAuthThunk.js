import axios from "axios";
import { SIGNIN_FAILURE, SIGNIN_START, SIGNIN_SUCCESS } from "../redux/authenticationSlice";
import { TOGGLE_SIGN } from "../redux/navigationSlice";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Sign in function
export const SIGN_USER = (credentials) => {
    return async (dispatch) => {
        dispatch(SIGNIN_START());
        try {
            const res = await axios.post(`${BACKEND_URL}/api/user/signin`, 
                { ...credentials },
                { headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }}
            );
            dispatch(SIGNIN_SUCCESS(res.data)); // Initialize user session 
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch(TOGGLE_SIGN({payload: false})); // Closing the sign in panel after succesful request
        
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};

// Create user function
export const CREATE_USER = (credentials) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/user/register`,
            { ...credentials },
            { headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }}
            );
            dispatch(SIGNIN_START());
            dispatch(SIGNIN_SUCCESS(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch(TOGGLE_SIGN({payload: false})); // Closing the sign in panel after succesful request
            
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};