import React, { useEffect, useState } from 'react';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';
// import { loadStripe } from '@stripe/stripe-js';
// import { makeRequest } from '../../hooks/makeRequest';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import favicon from '../../favicon.png'


const Cart = ({cartRef, open}) => {
    const [stripeToken, setStripeToken] = useState(null)
    const products = useSelector((state) => state.cart.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const totalPrice = () => {
        let total = 0
        products.forEach((item) => (total += item.quantity * item.price))
        return total.toFixed(2)
    }
    
    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/payment', {
                    tokenId : stripeToken.id,
                    amount : {totalPrice}
                })
                console.log(res.data)
                navigate.push('/success')
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, history])

    // OPTIONAL PAYMENT METHOD
    // const handlePayment = async () => {
    // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    //     try {
    //         const stripe = await stripePromise
    //         const res = await makeRequest.post('/orders', {products,})
    //         await stripe.redirectToCheckout({
    //             sessionId : res.data.stripeSession.id,
    //         })
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div ref={cartRef} className={`cart ${open ? 'active' : 'inactive'}`}>
            <h3>Products in your cart</h3>
            {products.map((item) => (
                <div className='item' key={item.id}>
                    <img src={item.image} alt=''/>
                    <div className='details'>
                        <h4>{item.title}</h4>
                        <p>{item.desc.substring(0,80) + '...'}</p>
                        <span>{item.quantity} x ${item.price}</span>
                    </div>
                    <DeleteOutlinedIcon className='delete' onClick={() => dispatch(removeItem(item.id))}/>
                </div>
            ))}
            <div className='total'>
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            {stripeToken ? (<span></span>) : 
            (<StripeCheckout 
                name = 'BUNDLER' 
                image = {favicon}
                billingAddress
                shippingAddress
                panelLabel='powered by STRIPE'
                description = {`your total is ${totalPrice()}`}
                amount = {Number(totalPrice())}
                token = {onToken}
                stripeKey = {import.meta.env.VITE_STRIPE_PUBLIC_KEY}>
                <button>PROCEED TO CHECKOUT</button>
            </StripeCheckout>)}
            <span className='reset' onClick={() => dispatch(resetCart())}>Empty Cart</span>
        </div>
    );
}

export default Cart;
