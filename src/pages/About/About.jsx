import { useEffect } from 'react';
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
                        At the heart of <span className='logo'>SVANE</span> lies a mission to revolutionize the fashion industry by offering eco-friendly alternatives without compromising on style. Our garments blend comfort and conscientiousness, reflecting the ethos of a modern, mindful lifestyle. Inspired by urban aesthetics and the beauty of simplicity, <span className='logo'>SVANE</span> embraces the philosophy that fashion should not only look good but also do good.
                    </p>
                </div>
                <div className='about-item flexc-center'>
                    <p> 
                        Join us on this journey towards a more sustainable and stylish future, where every purchase becomes a conscious choice for a better world. Welcome to <span className='logo'>SVANE</span>, where fashion meets responsibility, and simplicity is always in vogue.
                    </p>
                </div>
                <div className='about-item flexc-center'>
                    <img src='https://images.pexels.com/photos/9255747/pexels-photo-9255747.jpeg?auto=compress&cs=tinysrgb&w=940&dpr=1' alt='about image' loading='lazy' />
                </div>
                </article>
                <div className='flexc-center'>
                    <p>More about <span className='logo'>SVANE</span> :</p>
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
