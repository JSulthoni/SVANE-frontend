import React from 'react';
import './Contacts.scss'
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Contacts = () => {
    return (
        <div className='contacts' id='contacts'>
            <div className='wrapper'>
                <span>BE IN TOUCH WITH BNDLR</span>
                <form className='mail'>
                    <input className='mail-input' type='text' placeholder='place your email...' />
                    <button>JOIN US</button>
                </form>
                <div className='icons'>
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                    <GoogleIcon />
                    <PinterestIcon />
                </div>
            </div>
        </div>
    );
}

export default Contacts;
