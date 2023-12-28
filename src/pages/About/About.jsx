import { useEffect, useState } from 'react';
import icon from '../../assets/favicon.png'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import './About.scss'

const About = () => {

    const [openState, setOpenState] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setOpenState(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = () => {
        if (window.innerWidth <= 768) {
            setOpenState(!openState)
        }
    }

    // Scroll window to top of page on first mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className='about flexc-center'>
            <div className='about-wrapper flexc-center'>
                <div className='about-title'>
                    <img src={icon} alt='icon' />
                </div>
                <article className='about-par about-grid'>


                <div className='about-item flexc-center'>
                    <p>
                        Introducing <span className='logo'>SVANE</span>, where sustainable fashion meets urban simplicity. At <span className='logo'>SVANE</span>, we redefine casual wear with a commitment to environmental consciousness and contemporary design. Our online fashion haven is dedicated to providing a curated collection of casual outfits, from trendy shirts and cozy outers, all crafted with a passion for sustainability and an eye for urban style.
                    </p>
                </div>
                <div className='about-item flexc-center'>
                    <img src='https://images.pexels.com/photos/7319141/pexels-photo-7319141.jpeg?auto=compress&cs=tinysrgb&w=940&dpr=1' alt='about image' loading='lazy' />
                </div>
                <div className='about-item flexc-center'>
                    <img src='https://images.pexels.com/photos/9775899/pexels-photo-9775899.jpeg?auto=compress&cs=tinysrgb&w=940&dpr=1' alt='about image' loading='lazy' />
                </div>
                <div className='about-item flexc-center'>
                    <p> 
                        At the heart of <span className='logo'>SVANE</span> lies a mission to revolutionize the fashion industry by offering eco-friendly alternatives without compromising on style. Our garments blend comfort and conscientiousness, reflecting the ethos of a modern, mindful lifestyle. Inspired by urban aesthetics and the beauty of simplicity, <span className='logo'>SVANE</span> embraces the philosophy that fashion should not only look good but also do good. Join us on this journey towards a more sustainable and stylish future, where every purchase becomes a conscious choice for a better world. Welcome to <span className='logo'>SVANE</span>, where fashion meets responsibility, and simplicity is always in vogue.
                    </p>
                </div>
                <div className='about-item flexc-center'>
                <article className='about-par'>
                    <div className='flexr-c-between' onClick={() => handleClick()}>
                        <p className='about-icon'>For our dearest, here are quick guidelines about <span className='logo'>SVANE</span> :</p>
                        <span className='about-icon'>
                            { openState ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                        </span>
                    </div>
                    <ul className={`${openState ? 'active' : 'inactive'}`}>
                        <li><b>SVANE</b> is a place built for your fashion discovery.</li>
                        <li>Create an account or sign by clicking<span><AccountBoxSharpIcon className='about-icons'/></span>in to gain access to cart and checkout.</li>
                        <li>Each signed user of <b>SVANE</b> has their own wishlist<span><FavoriteBorderOutlinedIcon className='about-icons'/></span>and cart <span><ShoppingCartOutlinedIcon className='about-icons'/></span>.</li>
                        <li>Search for our collection by clicking<span><SearchOutlinedIcon className='about-icons'/></span> or go to Discover page.</li>
                        <li>Switch between daymode and nightmode by toggling between <span><BedtimeIcon className='about-icons'/></span>and <span><LightModeIcon className='about-icons'/></span>.</li>
                        <li>Checkout your desired product by clicking<span><LocalMallIcon className='about-icons' /></span>or<b> PROCEED TO CHECKOUT</b>. Checkout session is provided by Stripe.</li>
                        <li>To test checkout session, please enter <b>4242 4242 4242 4242</b> for Card Information, <b>04/02</b> for Card Expiry Date, and <b>424</b> for CVC as of Stripe test session. Any other information can be filled as wished.</li>
                    </ul>
                </article>
                </div>
                <div className='about-item flexc-center'>
                <img src='https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=940&dpr=1' alt='about image' loading='lazy' />
                </div>


                </article>
                
                <div className='flexc-center'>
                    <p>More about <span className='logo'>SVANE</span></p>
                    <div className='about-buttons flexr-center'>
                        <button className='about-button button-green'><a href='https://github.com/JSulthoni' target='_blank'>Author's Profile</a></button>
                        <button className='about-button button-green'><a href='https://github.com/JSulthoni/SVANE-frontend' target='_blank'>Github Code</a></button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
