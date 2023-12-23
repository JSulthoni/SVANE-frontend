import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Footer.scss';

const Footer = () => {
    const [openState, setOpenState] = useState({
        categories: window.innerWidth >= 810,
        link: window.innerWidth >= 810
    });
    
    // Handle toggle will only work if window.innerWidth <= 810
    const handleToogle = (type) => {
        if (window.innerWidth >= 810) {
            setOpenState((prev) => ({ ...prev, [type]: true }));
        } else {
            setOpenState((prev) => ({ ...prev, [type]: !prev[type] }));
            const otherType = type === 'categories' ? 'link' : 'categories';
            setOpenState((prev) => ({ ...prev, [otherType]: false }));
        }
    };
    
    // useEffect to set the openList on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 810) {
                setOpenState({
                    categories: true,
                    link: true,
                  });
            } else if (window.innerWidth <= 810) {
                setOpenState({
                    categories: false,
                    link: false,
                  });
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='footer' id='footer'>
            <div className='top'>
                <div className='footer-item'>
                    <div className='footer-title' onClick={() => handleToogle('categories')}>
                        <h3>Categories</h3>
                        { openState.categories ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </div>
                    <div className={`footer-list ${openState.categories ? 'active' : 'inactive'}`}>
                        <Link className='link' to='/products/women'>Women</Link>
                        <Link className='link' to='/products/men'>Men</Link>
                        <Link className='link' to='/products/unisex'>Unisex</Link>
                        <HashLink smooth className='link' to='/search?search=trending#top'>Trending</HashLink>
                        <HashLink smooth className='link' to='/search?search=featured#top'>Featured</HashLink>
                    </div>
                    <div className='footer-divider'></div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title' onClick={() => handleToogle('link')}>
                        <h3>Link</h3>
                        { openState.link ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </div>
                    <div className={`footer-list ${openState.link ? 'active' : 'inactive'}`}>
                        <HashLink smooth className='link' to='/#categories'>Categories</HashLink>
                        <Link className='link' to='/about'>About</Link>
                        <a className='link' href='https://github.com/JSulthoni'>Profile</a>
                        <a className='link' href='https://github.com/JSulthoni/SVANE-frontend'>Source Code</a>
                        <HashLink smooth className='link' to='/#contacts'>Contact</HashLink>
                    </div>
                    <div className='footer-divider'></div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title'>
                        <h3>About</h3>
                    </div>
                    <p>At <span className='logo'>SVANE</span>, we've reimagined the way you shop online. We understand the thrill of discovering fantastic products from around the world and the convenience of having them delivered to your doorstep. That's why we've designed a platform that connects you to every major fashion store across the globe from different places and buy them all in one go.</p>
                </div>
                <div className='footer-item'>
                    <div className='footer-title'>
                        <h3>Contacts</h3>
                    </div>
                    <p>Project <span className='logo'>SVANE</span> is created and developed by <a href='https://github.com/JSulthoni'>Javier Nauvel Sulthoni</a>. Reach out with email by <a href='mailto:sulthonijavier@gmail.com' target='_blank'>clicking here</a> or visit <a href='https://github.com/JSulthoni/SVANE-frontend'>the sourcecode</a>.</p>
                </div>
            </div>
            <div className='bottom'>
                    <span className='logo'>SVANE</span>
                    <span className='copyright'>2023. © Sulthoni Development. All Rights Reserved</span>
            </div>
        </div>
    )
};

export default Footer;
