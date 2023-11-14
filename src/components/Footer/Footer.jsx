import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Footer.scss';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='top'>
                <div className='item'>
                    <h3>Categories</h3>
                    <Link className='link' to='/products/women'>Women</Link>
                    <Link className='link' to='/products/men'>Men</Link>
                    <Link className='link' to='/products/unisex'>Unisex</Link>
                    <HashLink smooth className='link' to='/#trending'>Trending</HashLink>
                    <HashLink smooth className='link' to='/#featured'>Featured</HashLink>
                </div>
                <div className='item'>
                    <h3>Links</h3>
                    <span>FAQ</span>
                    <span>Pages</span>
                    <span>Stores</span>
                    <span>Compare</span>
                    <span>Cookies</span>
                </div>
                <div className='item'>
                    <h3>About</h3>
                    <p>At <span className='logo'>BNDLR</span>, we've reimagined the way you shop online. We understand the thrill of discovering fantastic products from around the world and the convenience of having them delivered to your doorstep. That's why we've designed a platform that not only connects you to every major fashion store across the globe but also lets you bundle items from different places and buy them all in one go.</p>
                </div>
                <div className='item'>
                <h3>Contacts</h3>
                    <p>Project <span className='logo'>BNDLR</span> is created and developed by <a href='https://github.com/JSulthoni'>Javier Nauvel Sulthoni</a>. Reach out with email by <a href='mailto:sulthonijavier@gmail.com' target='_blank'>clicking here</a> or visit <a href='https://github.com/JSulthoni/BUNDLER-frontend'>the sourcecode</a>.</p>
                </div>
            </div>
            <div className='bottom'>
                    <span className='logo'>BNDLR</span>
                    <span className='copyright'>2023 Sulthoni Development. All Rights Reserved</span>
            </div>
        </div>
    )
};

export default Footer;
