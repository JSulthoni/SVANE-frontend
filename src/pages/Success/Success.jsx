import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Success.scss';

const Success = () => {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const session_id = searchParams.get('session_id');

    // Redirect user to homepage if user is not having a checkout session
    useEffect(() => {
        if (!session_id) {
            navigate('/');
        }
    },[])

    return (
        <div className='success'>
            <h2>SUCCESS</h2>
            <p>Your order with ID:</p>
            <h4>{session_id}</h4>
            <p>is being prepared.</p>
            <p>We are grateful for you choosing <span>SVANE</span></p>
        </div>
    )
};

export default Success;
