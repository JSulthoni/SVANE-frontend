import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useLoggedIn from "../../hooks/useLoggedIn";
import { DECREMENT_ITEM_IN_CART, INCREMENT_ITEM_IN_CART, REMOVE_ITEM, RESET_CART } from '../../redux/bagSlice';
import { STRIPE_CHECKOUT } from '../../utils/makeStripeThunk';
import './Cart.scss';
import { UPDATE_BAG } from "../../utils/makeBagThunk";


const Cart = ({cartRef, open}) => {
    const { cart, wishlist } = useSelector((state) => state.bag);
    const dispatch = useDispatch();
    const isLoggedIn = useLoggedIn();

    // Calculating total price in cart
    const totalPrice = () => {
        let total = 0
        cart.forEach((item) => (total += item.quantity * item.product.price))
        return total.toFixed(2)
    };

    // This is a chain of debounching mechanism is intended to make the UPDATE_BAG dispatch execute after
    // timer expires. This is intended to lower request traffic and because wishlist and cart is a panel
    // that follows user anywhere.
    const [debounceTimer, setDebounceTimer] = useState(null);

    const debouncedDispatch = () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        const newDebounceDispatch = setTimeout(() => {
            const debouncedCart = cart.map((item) => ({ _id: item.product._id, quantity: item.quantity })) || [];
            const debouncedWishlist = wishlist.map((item) => ({ _id: item.product._id })) || [];
            
            // dispatch UPDATE_BAG with the specified condition 
            const condition = isLoggedIn && debouncedCart !== undefined && debouncedWishlist !== undefined
            if (condition) {
                dispatch(UPDATE_BAG({ cart: debouncedCart, wishlist: debouncedWishlist }));
            }
        }, 750) // Timer for debounce is adjusted at 750ms

        setDebounceTimer(newDebounceDispatch);
    };

    
    // This useEffect is to execute the debounce mechanism
    useEffect(() => {
        debouncedDispatch();

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        }
        // The dependency array includes cart and wishlist which to execute calculateDebouncedValues if
        // either of the value changed
    }, [cart, wishlist]);

    return (
        <div ref={cartRef} className={`panel ${open ? 'active' : 'inactive'}`}>
            <h3>{cart.length ? 'Products in your cart' : 'Your cart is empty'}</h3>
            {!cart.length ? null : 
            <div>
                <div className='panel-list'>
                    {cart.map((item) => {
                        const { product, quantity } = item;
                        return (
                            <div className='panel-item' key={product._id}>
                                <img src={`${product.image1}?auto=compress&cs=tinysrgb&w=360&dpr=1`} alt=''/>
                                <div className='panel-details'>
                                    <h4>{product.title}</h4>
                                    <p>{product.description.substring(0,80) + '...'}</p>
                                    <div className='panel-quantity flexr-c-start'>
                                    <span>{quantity} x ${product.price}</span>
                                        <button className='button-green' aria-label='decrement product' onClick={() => dispatch(DECREMENT_ITEM_IN_CART(product._id))}>-</button>
                                        <button className='button-green' aria-label='increment product' onClick={() => dispatch(INCREMENT_ITEM_IN_CART(product._id))}>+</button>
                                    </div>
                                </div>
                                <DeleteOutlinedIcon className='panel-delete' onClick={() => dispatch(REMOVE_ITEM(product._id))}/>
                            </div>
                        )
                    })}
                </div>
            <div className='panel-total'>
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button className='panel-button button-green' onClick={() => dispatch(STRIPE_CHECKOUT({ cart, option: 'cart' }))}>PROCEED TO CHECKOUT</button>
            <span className='panel-reset' onClick={() => dispatch(RESET_CART())}>Empty Cart</span>
            </div>}
        </div>
    )
};

export default Cart;
