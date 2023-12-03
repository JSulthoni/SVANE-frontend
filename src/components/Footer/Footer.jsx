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
                    <HashLink smooth className='link' to='/search?search=trending#top'>Trending</HashLink>
                    <HashLink smooth className='link' to='/search?search=featured#top'>Featured</HashLink>
                </div>
                <div className='item'>
                    <h3>Links</h3>
                    <span><HashLink smooth className='link' to='/#categories'>Categories</HashLink></span>
                    <span>Pages</span>
                    <span>Stores</span>
                    <span>Compare</span>
                    <span><HashLink smooth className='link' to='/#contacts'>Contact</HashLink></span>
                </div>
                <div className='item'>
                    <h3>About</h3>
                    <p>At <span className='logo'>SVANE</span>, we've reimagined the way you shop online. We understand the thrill of discovering fantastic products from around the world and the convenience of having them delivered to your doorstep. That's why we've designed a platform that connects you to every major fashion store across the globe from different places and buy them all in one go.</p>
                </div>
                <div className='item'>
                <h3>Contacts</h3>
                    <p>Project <span className='logo'>SVANE</span> is created and developed by <a href='https://github.com/JSulthoni'>Javier Nauvel Sulthoni</a>. Reach out with email by <a href='mailto:sulthonijavier@gmail.com' target='_blank'>clicking here</a> or visit <a href='https://github.com/JSulthoni/BUNDLER-frontend'>the sourcecode</a>.</p>
                </div>
            </div>
            <div className='bottom'>
                    <span className='logo'>SVANE</span>
                    <span className='copyright'> © 2023 Sulthoni Development. All Rights Reserved</span>
            </div>
        </div>
    )
};

export default Footer;
