import { useCallback, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { 
    TOGGLE_NIGHT, 
    TOGGLE_WISHLIST, 
    TOGGLE_CART, 
    TOGGLE_MENU, 
    TOGGLE_SEARCH, 
    TOGGLE_SIGN} from '../../redux/navigationSlice';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import Cart from '../Cart/Cart';
import useClickOutside from '../../hooks/useClickOutside';
import Favorite from '../Favorite/Favorite';
import Menu from '../Menu/Menu';
import Searchbar from '../Searchbar/Searchbar';
import SignIn from '../SignIn/SignIn';
import useLoggedIn from '../../hooks/useLoggedIn';
import './NavBar.scss';
import { RESET_NOTIFICATION } from '../../redux/notificationSlice';
import usePanels from '../../hooks/usePanels';

const NavBar = () => {
    const isLoggedIn = useLoggedIn();
    const searchRef = useRef(null);
    const wishRef = useRef(null);
    const cartRef = useRef(null);
    const { cart, wishlist } = useSelector(((state) => state.bag));
    const { openCart, openWishlist, openSearch, openSign, openMenu } = usePanels();
    const nightmode = useSelector(((state) => state.navigation.nightmode));
    const dispatch = useDispatch();
    

    // Notification set ups
    const { message } = useSelector((state) => state.notification);
    const openNotif = Boolean(message);
    useEffect(() => {
        setTimeout(() => {
            dispatch(RESET_NOTIFICATION());
        }, 3000);
    }, [openNotif]);


    // useClickOutside is a function to close respective panel when user double click outside of it/s
    useClickOutside(wishRef, () => {
        if (openWishlist) {
            dispatch(TOGGLE_WISHLIST(!openWishlist))
        }
    });

    useClickOutside(searchRef, () => {
        if (openSearch) {
            dispatch(TOGGLE_SEARCH(!openSearch))
        }
    });

    useClickOutside(cartRef, () => {
        if (openCart) {
            dispatch(TOGGLE_CART(!openCart))
        }
    });

    // Collective function to close all panel
    const closeAllPanel = useCallback(() => {
        dispatch(TOGGLE_WISHLIST(false));
        dispatch(TOGGLE_CART(false));
        dispatch(TOGGLE_SIGN(false));
        dispatch(TOGGLE_SEARCH(false));
        dispatch(TOGGLE_MENU(false));
    }, []);

    const togglePanel = (panelType) => {
        closeAllPanel();
        switch (panelType) {
          case 'search':
            dispatch(TOGGLE_SEARCH(!openSearch));
            break;
          case 'wishlist':
            dispatch(TOGGLE_WISHLIST(!openWishlist));
            break;
          case 'cart':
            dispatch(TOGGLE_CART(!openCart));
            break;
          case 'sign':
            dispatch(TOGGLE_SIGN(!openSign));
            break;
          case 'menu':
            dispatch(TOGGLE_MENU(!openMenu));
            break;
          default:
            break;
        }
    };
      
    const handleSearchClick = () => togglePanel('search');
    const handleWishlistClick = () => togglePanel('wishlist');
    const handleCartClick = () => togglePanel('cart');
    const handleSignInClick = () => togglePanel('sign');
    const handleMenuClick = () => togglePanel('menu');

    return (
        <div className='navbar'>
            <div className='wrapper'>
                <div className='left flexr-c-start'>
                    <div className='item flexr-c-start'>
                        <HashLink 
                            scroll={(el) => el.scrollIntoView({ block: 'start' })}
                            smooth 
                            className='link' 
                            to='/#categories'>Categories</HashLink>
                    </div>
                    <div className='item flexr-c-start'>
                        <HashLink smooth className='link' to='/products/men#top'>Men</HashLink>
                    </div>
                    <div className='item flexr-c-start'>
                        <HashLink smooth className='link' to='/products/women#top'>Women</HashLink>
                    </div>
                    <div className='item flexr-c-start'>
                        <HashLink smooth className='link' to='/products/unisex#top'>Unisex</HashLink>
                    </div>
                </div>
                <div className='center'>
                    <Link className='link' to='/'>SVANE</Link>
                </div>
                <div className='right flexr-c-start'>
                    <div className='item flexr-c-start'>
                        <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                    </div>
                    <div className='item flexr-c-start'>
                        <HashLink smooth className='link' to='/about#top'>About</HashLink>
                    </div>
                    <div className='item flexr-c-start'>
                        <HashLink smooth className='link' to='/discover#top'>Discover</HashLink>
                    </div>
                    <div className='icons'>
                        <div className='icon' onClick={handleSearchClick}>
                            {openSearch ? <SearchOffOutlinedIcon /> : <SearchOutlinedIcon />}
                        </div>
                        <div className='icon' onClick={handleWishlistClick}>
                            <FavoriteBorderOutlinedIcon />
                            <span className='flexc-center'>{wishlist.length}</span>
                        </div>
                        {
                            isLoggedIn && 
                        <div className='icon' onClick={handleCartClick}>
                            <ShoppingCartOutlinedIcon />
                            <span className='flexc-center'>{cart.length}</span>
                        </div>
                        }
                        <div className='icon icon-login' onClick={handleSignInClick}>
                            {!isLoggedIn && <p>Sign In</p>}<AccountBoxSharpIcon />
                        </div>
                        <div className='icon' onClick={() => dispatch(TOGGLE_NIGHT())}>
                            {nightmode ? <BedtimeIcon /> : <LightModeIcon />}
                        </div>
                        <div className='icon icon-menu' onClick={handleMenuClick}>
                            <MenuIcon />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Panels */}
                <Searchbar open={openSearch} searchRef={searchRef}/>
                <Favorite wishRef={wishRef} open={openWishlist}/>
                <Cart cartRef={cartRef} open={openCart}/>
                <Menu open={openMenu} handleMenu={handleMenuClick}/>
                <SignIn open={openSign}/>

            {/* Notification Snack Bar */}
            <div className={`notification ${openNotif ? 'active' : 'inactive'}`}>
                <p>{ message }</p>
            </div>
        </div>
    )
};

export default NavBar;
