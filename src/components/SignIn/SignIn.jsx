import React, { useState } from 'react';
import './SignIn.scss'
import makeMode from '../../utils/makeMode';

const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    // Disable the button if either input is empty
    const isDisabled = Boolean(credentials.email && credentials.password);

    const handleChange = (event) => {
        setCredentials((prev) => ({...prev, [event.target.id]: event.target.value}))
    }

    // Getting mode from redux
    const getMode = makeMode()

    return (
        <div className='sign' style={getMode}>
            <form action='' className='sign-form'>
                <h2>SIGN IN WINDOW</h2>
                <input 
                    style={getMode} 
                    type='email'
                    id='email' 
                    value={credentials.email} 
                    onChange={handleChange} 
                    placeholder='example@email.com'/>
                <input 
                    style={getMode} 
                    type='password'
                    id='password'
                    value={credentials.password} 
                    onChange={handleChange} 
                    placeholder='password'/>
                <button disabled={!isDisabled}>Sign In</button>
                <button disabled={!isDisabled}>Create Account</button>
            </form>
        </div>
    );
}

export default SignIn;
