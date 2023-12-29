import { SET_BAG } from "../redux/bagSlice";
import { makeAuth } from "./makeAPI";
import { SET_NOTIFICATION } from "../redux/notificationSlice";
import { SIGNOUT_USER } from "./makeAuthThunk";

// This function gets user's bag and update redux store with the response
export const GET_BAG = () => {
    return async (dispatch) => {
        try {
            // Making request to get user's bag
            const res = await makeAuth.get('/bag/get');
            // Setting redux bag with data from response
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SET_NOTIFICATION('Something went wrong, please try again later'));
            dispatch(SIGNOUT_USER());
        }
    }
};

// This function updates user's bag and update redux store with the response
export const UPDATE_BAG = ({ cart, wishlist }) => {
    return async (dispatch) => {
        try {
            // Making request to update user's bag with the payload
            const res = await makeAuth.put('/bag/put', { cart, wishlist });

            dispatch(SET_NOTIFICATION(res.data));
        } catch (error) {
            dispatch(SET_NOTIFICATION('Something went wrong, please try again later'));
        }
    }
};