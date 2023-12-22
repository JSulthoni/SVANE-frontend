import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Success.scss';
import { useDispatch } from 'react-redux';
import { TOGGLE_CART, TOGGLE_WISHLIST } from '../../redux/navigationSlice';

const Success = () => {
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session_id = searchParams.get('session_id');

    // Redirect user to homepage if user is not having a checkout session
    useEffect(() => {
        if (!session_id) {
            navigate('/');
        } else if (session_id) {
            dispatch(TOGGLE_WISHLIST({ payload: false }));
            dispatch(TOGGLE_CART({ payload: false }));
        }
    },[]);

    return (
        <section className='success'>
            <div className='success-wrapper flex-center'>
                <h2>SUCCESS</h2>
                <p>Your order with ID:</p>
                <h4>{session_id}</h4>
                <p>is being prepared.</p>
                <p>We are grateful for you choosing <span>SVANE</span></p>
            </div>
        </section>
    )
};

export default Success;
