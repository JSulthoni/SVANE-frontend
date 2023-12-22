import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNOUT } from '../../redux/authenticationSlice';
import { TOGGLE_CART, TOGGLE_SIGN, TOGGLE_WISHLIST } from '../../redux/navigationSlice';
import { CREATE_USER, SIGNOUT_USER, SIGN_USER } from '../../utils/makeAuthThunk';
import useLoggedIn from '../../hooks/useLoggedIn';
import './SignIn.scss'

const SignIn = ({open}) => {
    const dispatch = useDispatch();

    // Getting products and wishlist from redux
    const { cart, wishlist } = useSelector((state) => state.bag);
    
    // Getting state of user from redux
    const { user, loading, error } = useSelector((state) => state.authentication);
    const isLoggedIn = useLoggedIn();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // Variable used to disable the button if either input is empty
    const isDisabled = Boolean(credentials.email && credentials.password);

    // Using the input ID for a oneliner setCredentials for both input
    const handleChange = (event) => {
        setCredentials((prev) => ({...prev, [event.target.id]: event.target.value}))
    }

    // Sign in function
    const handleSignin = (event) => {
        event.preventDefault();
        dispatch(SIGN_USER(credentials)); // Request is handled by using thunk at makeAuthThunk.js
    };

    // Create user function
    const handleCreate = (event) => {
        event.preventDefault();
        const wishlistPayload = Promise.all(wishlist.map((item) => ({_id: item.product._id}))) || [];
        dispatch(CREATE_USER({
            email: credentials.email,
            password: credentials.password,
            wishlist: wishlistPayload
        })); // Request is handled by using thunk at makeAuthThunk.js

    };

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
                        <span>Products in chart :</span><span className='sign-amount'>{cart.length}</span>
                    </div>
                    <div onClick={() => handleClick('wish')}>
                        <span>Items in wishlist :</span><span className='sign-amount'>{wishlist.length}</span>
                    </div>
                </div>
                <button
                    onClick={() => dispatch(SIGNOUT_USER())}
                >SIGN OUT</button>
            </div>
        : 
            <form className='sign-form'>
                <h2>SIGN IN</h2>
                <input 
                    type='email'
                    id='email' 
                    autoComplete='username'
                    value={credentials.email} 
                    onChange={handleChange} 
                    placeholder='example@email.com'/>
                <input 
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={credentials.password} 
                    onChange={handleChange} 
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
