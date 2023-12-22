import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NotFound.scss';

const NotFound = () => {
    return (
        <div className='notfound'>
            <div className='notfound-wrapper flex-center'>
                <h2>Page not found!</h2>
                <p>Sorry, we could not find what you are looking for</p>
                <p>Get back to <span><HashLink smooth className='link' to='/#'>SVANE</HashLink></span> ?</p>
            </div>
        </div>
    )
};

export default NotFound;
