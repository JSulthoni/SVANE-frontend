import { SET_BAG } from "../redux/bagSlice";
import { SIGNIN_FAILURE } from "../redux/authenticationSlice";
import { makeAuth } from "./makeAPI";

// This function gets user's bag and update redux store with the response
export const GET_BAG = () => {
    return async (dispatch) => {
        try {
            const res = await makeAuth.get('/bag/get');
            
            // Setting redux bag with data from response
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message)); // change these later with console.log('')
        }
    }
};

// This function updates user's bag and update redux store with the response
export const UPDATE_BAG = ({ cart, wishlist }) => {
    return async (dispatch) => {
        try {

            // Transforming the payload into a simplified array format
            const cartPayload = cart.map((item) => ({_id: item.product._id, quantity: item.quantity})) || [];
            const wishlistPayload = wishlist.map((item) => ({_id: item.product._id})) || [];
            
            // Making request with the transformed payload
            const res = await makeAuth.put('/bag/put', { 
                cart: cartPayload,
                wishlist: wishlistPayload
            });
            
            // Setting redux bag with data from response
            dispatch(SET_BAG(res.data));
        } catch (error) {
            dispatch(SIGNIN_FAILURE(error.message)); // change these later with console.log('')
        }
    }
};