import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NotFound.scss';

const NotFound = () => {
    return (
        <div className='success'>
            <h2>Page not found!</h2>
            <p>Sorry, we cannot find what you are looking for</p>
            <p>Get back to <span><HashLink smooth className='link' to='/#'>homepage</HashLink></span> ?</p>
        </div>
    )
};

export default NotFound;
