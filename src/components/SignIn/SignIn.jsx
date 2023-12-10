import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNIN_FAILURE, SIGNIN_START, SIGNIN_SUCCESS, SIGNOUT } from '../../redux/authenticationSlice';
import { TOGGLE_CART, TOGGLE_SIGN, TOGGLE_WISHLIST } from '../../redux/navigationSlice';
import useLoggedIn from '../../hooks/useLoggedIn';
import axios from 'axios';
import './SignIn.scss'

const SignIn = ({open}) => {
    const dispatch = useDispatch();

    // Getting products and wishlist from redux
    const { products, wishlist } = useSelector((state) => state.context);
    
    // Getting state of user from redux
    const { user, loading, error } = useSelector((state) => state.authentication);
    const isLoggedIn = useLoggedIn();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    // Disable the button if either input is empty
    const isDisabled = Boolean(credentials.email && credentials.password);

    // Using the input ID for a oneliner setCredentials for both input
    const handleChange = (event) => {
        setCredentials((prev) => ({...prev, [event.target.id]: event.target.value}))
    }

    // Sign in function
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const handleSignin = async (event) => {
        event.preventDefault();
        dispatch(SIGNIN_START());
        try {
            const req = await axios.post(`${BACKEND_URL}/api/user/signin`, 
                { ...credentials },
                { headers: { Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY }}
            );
            const res =  await req.data;
            if (res) {
                dispatch(SIGNIN_SUCCESS(res));
                localStorage.setItem('user', JSON.stringify(res));
                dispatch(TOGGLE_SIGN({payload: false}));
            }
        } catch (err) {
                dispatch(SIGNIN_FAILURE(err.message));
        }
    };

    // Create user function
    const handleCreate = async (event) => {
        event.preventDefault();
        console.log('CREATE USER');
        try {
            const req = await axios.post(`${BACKEND_URL}/api/user/register`,
            { ...credentials },
            { headers: { Authorization: 'Bearer' + import.meta.env.VITE_MONGO_API_KEY }}
        );
            const res = await req.data;
            if (res) {
                dispatch(SIGNIN_START());
                dispatch(SIGNIN_SUCCESS(res));
                localStorage.setItem('user', JSON.stringify(res));
                dispatch(TOGGLE_SIGN({payload: false}));
            }
        } catch (err) {
            dispatch(SIGNIN_FAILURE(err.message));
        }
    }

    // Click handler
    const handleClick = (type) => {
        dispatch(TOGGLE_SIGN({payload : !open}));
        switch (type) {
            case 'cart':
                dispatch(TOGGLE_CART({payload : true}));
                break;
            case 'wish':
                dispatch(TOGGLE_WISHLIST({payload : true}));
                break;    
            default:
                break;
        }
    };

    return (
        <div className={`sign ${open ? 'active' : 'inactive'}`}>
        { isLoggedIn ? 
            <div className='sign-profile'>
                <div className='sign-header'>
                    <h3>WELCOME</h3>
                    <h4>{user.email}</h4>
                    <p>ID : {user._id}</p>
                </div>
                <div className='sign-info'>
                    <div onClick={() => handleClick('cart')}>
                        <span>Products in chart :</span><span className='sign-amount'>{products.length}</span>
                    </div>
                    <div onClick={() => handleClick('wish')}>
                        <span>Items in wishlist :</span><span className='sign-amount'>{wishlist.length}</span>
                    </div>
                </div>
                <button
                    onClick={() => dispatch(SIGNOUT())}
                >SIGN OUT</button>
            </div>
        : 
            <form className='sign-form' action='javascript:void(0)'>
                <h2>SIGN IN</h2>
                <input 
                    type='email'
                    id='email' 
                    value={credentials.email} 
                    onChange={handleChange} 
                    placeholder='example@email.com'/>
                <input 
                    type='password'
                    id='password'
                    value={credentials.password} 
                    onChange={handleChange} 
                    suggested= "current-password"
                    placeholder='password'/>
                <button onClick={handleSignin} disabled={!isDisabled}>Sign In</button>
                <button onClick={handleCreate} disabled={!isDisabled}>Create Account</button>
                { error && 
                <div className='sign-error'>
                    <p>{error}</p>
                </div> }
            </form>
        }
        </div>
    );
}

export default SignIn;
