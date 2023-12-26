import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_CART, TOGGLE_SIGN, TOGGLE_WISHLIST } from '../../redux/navigationSlice';
import { CREATE_USER, SIGNOUT_USER, SIGN_USER } from '../../utils/makeAuthThunk';
import { GET_BAG } from '../../utils/makeBagThunk';
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


    // Panel click handler
    const handleClick = (type) => {
        dispatch(TOGGLE_SIGN(false));
        switch (type) {
            case 'cart':
                dispatch(TOGGLE_CART(true));
                break;
            case 'wish':
                dispatch(TOGGLE_WISHLIST(true));
                break;    
            default:
                break;
        }
    };


    // This condition is to get user's bag only and after user is signed in
    // This is intended to run only once after user is signed in
    useEffect(() => {
        let mounted = true
            if (mounted && isLoggedIn) {
                dispatch(GET_BAG());
            } 
        return () => {
            mounted = false
        }
    }, [isLoggedIn]);

    return (
        <div className={`sign flexc-center ${open ? 'active' : 'inactive'}`}>
        { isLoggedIn ? 
            <div className='sign-panel flexc-c-start'>
                <div className='sign-header flexc-s-between'>
                    <h3>WELCOME</h3>
                    <h4>{user.email}</h4>
                </div>
                <div className='sign-info flexc-s-between'>
                    <div onClick={() => handleClick('cart')}>
                        <span>Products in cart :</span><span className='sign-amount'>{cart.length}</span>
                    </div>
                    <div onClick={() => handleClick('wish')}>
                        <span>Items in wishlist :</span><span className='sign-amount'>{wishlist.length}</span>
                    </div>
                </div>
                <button
                    className='sign-button button-transparent'
                    onClick={() => dispatch(SIGNOUT_USER())}
                >SIGN OUT</button>
            </div>
        : 
            <form className='sign-panel flexc-c-start'>
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
                <button className='panel-button button-green' onClick={handleSignin} disabled={!isDisabled}>Sign In</button>
                <button className='panel-button button-green' onClick={handleCreate} disabled={!isDisabled}>Create Account</button>
                { error ? 
                <div className='panel-error'>
                    <p>{error}</p>
                </div> : null }
            </form>
        }
        </div>
    );
}

export default memo(SignIn);
