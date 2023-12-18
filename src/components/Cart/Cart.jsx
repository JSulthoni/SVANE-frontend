import React, { useState } from 'react';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { DECREMENT_ITEM_IN_CART, INCREMENT_ITEM_IN_CART, REMOVE_ITEM, RESET_CART } from '../../redux/bagSlice';
import './Cart.scss';


const Cart = ({cartRef, open}) => {
    const { cart } = useSelector((state) => state.bag);
    const dispatch = useDispatch();
    const [ showError, setShowError ] = useState(false)

    // Handling payment error
    const handleError = () => {
        setTimeout(() => {
            setShowError(prev => !prev)
        }, 5000)
        setShowError(prev => !prev)
    }

    // Calculating total price in cart
    const totalPrice = () => {
        let total = 0
        cart.forEach((item) => (total += item.quantity * item.price))
        return total.toFixed(2)
    };

    // Stripe payment function
    const URL = import.meta.env.VITE_BACKEND_URL
    const handlePayment = async () => {
        try {
            const req = await fetch(`${URL}/api/stripe/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({products})
            })
            const res =  await req.json();
            if (res.url) {
                window.location.assign(res.url); // User is redirected to this URL if request is fulfilled
            }
        } catch (error) {
            console.error('Error during payment:', error);
            handleError();
        }
    };

    return (
        <div ref={cartRef} className={`cart ${open ? 'active' : 'inactive'}`}>
            <h3>{cart.length ? 'Products in your cart' : 'Your cart is empty'}</h3>
            {!cart.length ? '' : 
            <div>
                <div className='cart-list'>
                    {cart.map((item) => (
                        <div className='cart-item' key={item.id}>
                            <img src={`${item.image}?auto=compress&cs=tinysrgb&w=360&dpr=1`} alt=''/>
                            <div className='cart-details'>
                                <h4>{item.title}</h4>
                                <p>{item.desc.substring(0,80) + '...'}</p>
                                <div className='cart-quantity'>
                                <span>{item.quantity} x ${item.price}</span>
                                    <button aria-label='decrement product' onClick={() => dispatch(DECREMENT_ITEM_IN_CART(item.id))}>-</button>
                                    <button aria-label='increment product' onClick={() => dispatch(INCREMENT_ITEM_IN_CART(item.id))}>+</button>
                                </div>
                            </div>
                            <DeleteOutlinedIcon className='cart-delete' onClick={() => dispatch(REMOVE_ITEM(item.id))}/>
                        </div>
                    ))}
                </div>
            <div className='cart-total'>
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            <div className={`cart-error ${showError ? 'active' : 'inactive'}`}>
                <p>We could not process your order.</p>
                <p>Sorry for the inconvenience.</p>
            </div>
            <span className='cart-reset' onClick={() => dispatch(RESET_CART())}>Empty Cart</span>
            </div>}
        </div>
    )
};

export default Cart;
