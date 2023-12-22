import { SET_NOTIFICATION } from "../redux/notificationSlice";
import { makeAuth } from './makeAPI';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export const STRIPE_CHECKOUT = ({ cart }) => {
    return async (dispatch) => {

        // Variable to validate cart format. This to only make request if format is valid
        const isValidCartPayload = Array.isArray(cart) && cart.every(item => item.product && item.quantity);
        try {
            if (isValidCartPayload) {
                // The request payload is an object with key of 'cart' and value of array of object
                const res = await makeAuth.post(`${BACKEND_URL}/stripe/create`, { cart });

                // User is redirected to this URL if request is fulfilled
                window.location.assign(res.data.url);
                dispatch(SET_NOTIFICATION('PROCEEDING TO CHECKOUT'));
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Handle 500 Internal Server Error
                console.error('Server error: ', error.response.data);
            } else {
                // Handle other HTTP errors or network issues
                console.error('Network error: ', error.message);
            }
            dispatch(SET_NOTIFICATION('SOMETHING WENT WRONG'));
        }
    }
};