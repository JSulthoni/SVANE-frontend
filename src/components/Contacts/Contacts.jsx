import React from 'react';
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import './Contacts.scss';

const Contacts = () => {
    return (
        <div className='contacts' id='contacts'>
            <div className='wrapper'>
                <span>BE IN TOUCH WITH <b>BNDLR</b></span>
                <form className='mail'>
                    <input className='mail-input' type='text' placeholder='place your email...' />
                    <button>JOIN US</button>
                </form>
                <div className='icons'>
                    <InstagramIcon />
                    <TwitterIcon />
                    <GoogleIcon />
                </div>
            </div>
        </div>
    )
};

export default Contacts;
