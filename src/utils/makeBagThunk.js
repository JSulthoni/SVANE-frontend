import axios from "axios";
import { SET_BAG } from "../redux/bagSlice";
import { SIGNIN_FAILURE } from "../redux/authenticationSlice";
import { makeAuth } from "./makeRequest";

// This function gets user's bag and update redux store with the response
export const GET_BAG = () => {
    return async (dispatch) => {
        try {
            const res = await makeAuth.get('/bag/get');
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};

export const UPDATE_BAG = (payload) => {
    return async (dispatch) => {
        try {
            const res = await makeAuth.put('/bag/put', { ...payload });
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message));
        }
    }
};