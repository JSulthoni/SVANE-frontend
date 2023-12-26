import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Footer.scss';

const Footer = () => {
    const [openState, setOpenState] = useState({
        categories: window.innerWidth > 768,
        link: window.innerWidth > 768
    });

    useEffect(() => {
        const handleResize = () => {
            setOpenState({
                categories: window.innerWidth > 768,
                link: window.innerWidth > 768,
            });
        };

        handleResize(); // Set initial state on mount

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    return (
        <section className='footer' id='footer'>
            <div className='top'>
                <div className='footer-item'>
                    <div className='footer-title flexr-c-between' onClick={() => handleToogle('categories')}>
                        <h3>Categories</h3>
                        { openState.categories ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </div>
                    <div className={`footer-list flexc-s-start ${openState.categories ? 'active' : 'inactive'}`}>
                        <Link className='link' to='/products/women'>Women</Link>
                        <Link className='link' to='/products/men'>Men</Link>
                        <Link className='link' to='/products/unisex'>Unisex</Link>
                        <HashLink smooth className='link' to='/search?search=trending#top'>Trending</HashLink>
                        <HashLink smooth className='link' to='/search?search=featured#top'>Featured</HashLink>
                    </div>
                    <div className='footer-divider'></div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title flexr-c-between' onClick={() => handleToogle('link')}>
                        <h3>Link</h3>
                        { openState.link ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </div>
                    <div className={`footer-list flexc-s-start ${openState.link ? 'active' : 'inactive'}`}>
                        <HashLink smooth className='link' to='/#categories'>Categories</HashLink>
                        <Link className='link' to='/about'>About</Link>
                        <a className='link' href='https://github.com/JSulthoni'>Profile</a>
                        <a className='link' href='https://github.com/JSulthoni/SVANE-frontend'>Source Code</a>
                        <HashLink smooth className='link' to='/#contacts'>Contact</HashLink>
                    </div>
                    <div className='footer-divider'></div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title flexr-c-between'>
                        <h3>About</h3>
                    </div>
                    <div className='footer-list flexc-s-start'>
                        <p>At <b>SVANE</b>, we've reimagined the way you shop online. We understand the thrill of discovering fantastic products from around the world and the convenience of having them delivered to your doorstep. That's why we've designed a platform that connects you to every major fashion store across the globe from different places and buy them all in one go.</p>
                    </div>
                </div>
                <div className='footer-item'>
                    <div className='footer-title flexr-c-between'>
                        <h3>Contacts</h3>
                    </div>
                    <div className='footer-list flexc-s-start'>
                        <p>Project <b>SVANE</b> is created and developed by <a href='https://github.com/JSulthoni'>Javier Nauvel Sulthoni</a>. Reach out with email by <a href='mailto:sulthonijavier@gmail.com' target='_blank'>clicking here</a> or visit <a href='https://github.com/JSulthoni/SVANE-frontend'>the sourcecode</a>.</p>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                    <span className='logo'>SVANE</span>
                    <span className='copyright'>2023. © Sulthoni Development. All Rights Reserved</span>
            </div>
        </section>
    )
};

export default Footer;
