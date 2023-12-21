import axios from "axios";
import { SIGNIN_FAILURE, SIGNIN_START, SIGNIN_SUCCESS, SIGNOUT } from "../redux/authenticationSlice";
import { TOGGLE_SIGN } from "../redux/navigationSlice";
import { makeAuth } from "./makeRequest";
import { GET_BAG } from "./makeBagThunk";
import { RESET_CART, RESET_WISH } from "../redux/bagSlice";

// Sign in function
export const SIGN_USER = (credentials) => {
    return async (dispatch) => {
        dispatch(SIGNIN_START());
        try {
            const res = await makeAuth.post('/user/signin', { ...credentials });
            dispatch(SIGNIN_SUCCESS(res.data)); // Initialize user session 

            // Getting user's bag after request is success
            dispatch(GET_BAG());

            // Closing the sign in panel after succesful request
            dispatch(TOGGLE_SIGN({payload: false})); 
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};

// Create user function
// This function will also initialize users cart and wishlist
export const CREATE_USER = (body) => {
    return async (dispatch) => {
        try {
            const res = await makeAuth.post('/user/register', { ...body });
            dispatch(SIGNIN_START());
            dispatch(SIGNIN_SUCCESS(res.data));
            dispatch(GET_BAG());

            // Closing the sign in panel after succesful request
            dispatch(TOGGLE_SIGN({payload: false}));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};

// Signout user function
export const SIGNOUT_USER = () => {
    return async (dispatch) => {
        try {
            await makeAuth.get('/user/signout');
            dispatch(SIGNOUT());
            dispatch(RESET_CART());
            dispatch(RESET_WISH());

            // Closing the sign in panel after succesful request
            dispatch(TOGGLE_SIGN({payload: false}));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};