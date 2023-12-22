import React, { useState } from 'react';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { DECREMENT_ITEM_IN_CART, INCREMENT_ITEM_IN_CART, REMOVE_ITEM, RESET_CART } from '../../redux/bagSlice';
import './Cart.scss';
import { STRIPE_CHECKOUT } from '../../utils/makeStripeThunk';


const Cart = ({cartRef, open}) => {
    const { cart } = useSelector((state) => state.bag);
    const dispatch = useDispatch();

    // Calculating total price in cart
    const totalPrice = () => {
        let total = 0
        cart.forEach((item) => (total += item.quantity * item.product.price))
        return total.toFixed(2)
    };

    // Stripe payment function
    // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    // const handlePayment = async () => {
    //     try {
    //         const req = await fetch(`${BACKEND_URL}/stripe/create`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ cart })
    //         })
    //         const res =  await req.json();
    //         if (res.url) {
    //             window.location.assign(res.url); // User is redirected to this URL if request is fulfilled
    //         }
    //     } catch (error) {
    //         console.error('Error during payment:', error);
    //     }
    // };

    return (
        <div ref={cartRef} className={`cart ${open ? 'active' : 'inactive'}`}>
            <h3>{cart.length ? 'Products in your cart' : 'Your cart is empty'}</h3>
            {!cart.length ? '' : 
            <div>
                <div className='cart-list'>
                    {cart.map((item) => {
                        const { product, quantity } = item;
                        return (
                            <div className='cart-item' key={product._id}>
                                <img src={`${product.image1}?auto=compress&cs=tinysrgb&w=360&dpr=1`} alt=''/>
                                <div className='cart-details'>
                                    <h4>{product.title}</h4>
                                    <p>{product.description.substring(0,80) + '...'}</p>
                                    <div className='cart-quantity'>
                                    <span>{quantity} x ${product.price}</span>
                                        <button aria-label='decrement product' onClick={() => dispatch(DECREMENT_ITEM_IN_CART(product._id))}>-</button>
                                        <button aria-label='increment product' onClick={() => dispatch(INCREMENT_ITEM_IN_CART(product._id))}>+</button>
                                    </div>
                                </div>
                                <DeleteOutlinedIcon className='cart-delete' onClick={() => dispatch(REMOVE_ITEM(product._id))}/>
                            </div>
                        )
                    })}
                </div>
            <div className='cart-total'>
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button onClick={() => dispatch(STRIPE_CHECKOUT({ cart }))}>PROCEED TO CHECKOUT</button>
            <span className='cart-reset' onClick={() => dispatch(RESET_CART())}>Empty Cart</span>
            </div>}
        </div>
    )
};

export default Cart;
