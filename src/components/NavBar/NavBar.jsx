import React, { useRef } from 'react';
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

const NavBar = () => {
    const isLoggedIn = useLoggedIn();
    const searchRef = useRef(null);
    const wishRef = useRef(null);
    const cartRef = useRef(null);
    const { products, wishlist } = useSelector(((state) => state.context));
    const openSearch = useSelector(((state) => state.navigation.search));
    const nightmode = useSelector(((state) => state.navigation.nightmode));
    const openWishlist = useSelector(((state) => state.navigation.wishlist));
    const openSign =  useSelector(((state) => state.navigation.sign))
    const openCart = useSelector(((state) => state.navigation.cart));
    const openMenu = useSelector(((state) => state.navigation.menu));
    const dispatch = useDispatch();

    useClickOutside(wishRef, () => {
        if (openWishlist) {
            dispatch(TOGGLE_WISHLIST({payload : !openWishlist}))
        }
    });

    useClickOutside(searchRef, () => {
        if (openSearch) {
            dispatch(TOGGLE_SEARCH({payload : !openSearch}))
        }
    });

    useClickOutside(cartRef, () => {
        if (openCart) {
            dispatch(TOGGLE_CART({payload : !openCart}))
        }
    });

    
    const closeAllMenus = () => {
        dispatch(TOGGLE_WISHLIST({ payload: false }));
        dispatch(TOGGLE_CART({ payload: false }));
        dispatch(TOGGLE_SIGN({ payload: false }));
        dispatch(TOGGLE_SEARCH({ payload: false }));
        dispatch(TOGGLE_MENU({ payload: false }));
    };

    const handleSearchClick = () => {
        closeAllMenus();
        dispatch(TOGGLE_SEARCH({ payload: !openSearch }));
    };

    const handleWishlistClick = () => {
        closeAllMenus();
        dispatch(TOGGLE_WISHLIST({ payload: !openWishlist }));
    };

    const handleCartClick = () => {
        closeAllMenus();
        dispatch(TOGGLE_CART({ payload: !openCart }));
    };

    const handleSignInClick = () => {
        closeAllMenus();
        dispatch(TOGGLE_SIGN({ payload: !openSign }));
    };

    const handleMenuClick = () => {
        closeAllMenus();
        dispatch(TOGGLE_MENU({ payload: !openMenu }));
    };

    return (
        <div className='navbar'>
            <div className='wrapper'>
                <div className='left'>
                    <div className='item'>
                        <HashLink 
                            scroll={(el) => el.scrollIntoView({ block: 'start' })}
                            smooth 
                            className='link' 
                            to='/#categories'>Categories</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/products/men#top'>Men</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/products/women#top'>Women</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/products/unisex#top'>Unisex</HashLink>
                    </div>
                </div>
                <div className='center'>
                    <Link className='link' to='/'>SVANE</Link>
                </div>
                <div className='right'>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/about#top'>About</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/search#top'>Discover</HashLink>
                    </div>
                    <div className='icons'>
                        <div className='icon' onClick={handleSearchClick}>
                            {openSearch ? <SearchOffOutlinedIcon /> : <SearchOutlinedIcon />}
                        </div>
                        <div className='icon' onClick={handleWishlistClick}>
                            <FavoriteBorderOutlinedIcon />
                            <span>{wishlist.length}</span>
                        </div>
                        {
                            isLoggedIn && 
                        <div className='icon' onClick={handleCartClick}>
                            <ShoppingCartOutlinedIcon />
                            <span>{products.length}</span>
                        </div>
                        }
                        <div className='icon icon-login' onClick={handleSignInClick}>
                            {!isLoggedIn && <p>Sign In</p>}<AccountBoxSharpIcon />
                        </div>
                        <div className='icon' onClick={() => dispatch(TOGGLE_NIGHT())}>
                            {nightmode ? <BedtimeIcon /> : <LightModeIcon />}
                        </div>
                        <div className='icon-menu' onClick={handleMenuClick}>
                            <MenuIcon />
                        </div>
                    </div>
                </div>
            </div>
                <Searchbar open={openSearch} searchRef={searchRef}/>
                <Favorite wishRef={wishRef} open={openWishlist}/>
                <Cart cartRef={cartRef} open={openCart}/>
                <Menu open={openMenu} handleMenu={handleMenuClick}/>
                <SignIn open={openSign}/>
        </div>
    )
};

export default NavBar;
