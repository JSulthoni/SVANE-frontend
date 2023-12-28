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

    return (
        <section className='about flexc-center'>
            <div className='about-wrapper flexc-center'>
                <div className='about-title'>
                    <img src={icon} alt='icon' />
                </div>
                <article className='about-par'>
                    <p>
                        <span className='logo'>SVANE </span> 
                        began in November 2023 as portofolio project. The initial goal was to create Full Stack M.E.R.N online shop application designed for responsive UI and high-performance, ensuring UI and functionality to various screen sizes.
                    </p>
                </article>
                <article className='about-par'>
                    <div className='flexr-c-between' onClick={() => handleClick()}>
                        <p>Here are quick guidelines about <span className='logo'>SVANE</span> :</p>
                        <span className='about-icon'>
                            { openState ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                        </span>
                    </div>
                    <ul className={`${openState ? 'active' : 'inactive'}`}>
                        <li><b>SVANE</b> is intended as an online shop for fashion products.</li>
                        <li>User can create account and sign by clicking<span><AccountBoxSharpIcon/></span>in to gain access to cart and checkout.</li>
                        <li>Each signed user of <b>SVANE</b> has their own wishlist<span><FavoriteBorderOutlinedIcon/></span>and cart <span><ShoppingCartOutlinedIcon/></span>.</li>
                        <li>User can search for product by clicking<span><SearchOutlinedIcon/></span> or go to Discover page.</li>
                        <li>User can close search, wishlist, and cart panel by double-clicking outside.</li>
                        <li>User can switch between daymode and nightmode by toggling between <span><BedtimeIcon/></span>and <span><LightModeIcon/></span>.</li>
                        <li>User make checkout session by clicking<span><LocalMallIcon /></span>or<b> PROCEED TO CHECKOUT</b>. Checkout session is provided by Stripe.</li>
                        <li>For checkout session, please enter <b>4242 4242 4242 4242</b> for Card Information, <b>04/02</b> for Card Expiry Date, and <b>424</b> for CVC as of Stripe test session. Any other information can be filled as wished.</li>
                    </ul>
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
