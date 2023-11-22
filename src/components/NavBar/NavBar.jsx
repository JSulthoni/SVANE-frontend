import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { 
    TOGGLE_NIGHT, 
    TOGGLE_WISHLIST, 
    TOGGLE_CART, 
    TOGGLE_MENU, 
    TOGGLE_SEARCH } from '../../redux/navigationReducer';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import Cart from '../Cart/Cart';
import useClickOutside from '../../hooks/useClickOutside';
import Favorite from '../Favorite/Favorite';
import Menu from '../Menu/Menu';
import Search from '../Search/Search';
import './Navbar.scss';

const NavBar = () => {
    const searchRef = useRef(null);
    const wishRef = useRef(null);
    const cartRef = useRef(null);
    const products = useSelector(((state) => state.context.products));
    const wishlist = useSelector(((state) => state.context.wishlist));
    const nightmode = useSelector(((state) => state.navigation.nightmode));
    const openSearch = useSelector(((state) => state.navigation.search));
    const openWishlist = useSelector(((state) => state.navigation.wishlist));
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

    const handleMenu = () => {
        dispatch(TOGGLE_SEARCH({payload : false}))
        dispatch(TOGGLE_CART({payload : false}))
        dispatch(TOGGLE_WISHLIST({payload : false}))
        dispatch(TOGGLE_MENU({payload : !openMenu}))
    }

    return (
        <div className='navbar' style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
            <div className='wrapper'>
                <div className='left'>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#categories'>Categories</HashLink>
                    </div>
                    <div className='item'>
                        <Link className='link' to='/products/men'>Men</Link>
                    </div>
                    <div className='item'>
                        <Link className='link' to='/products/women'>Women</Link>
                    </div>
                    <div className='item'>
                        <Link className='link' to='/products/unisex'>Unisex</Link>
                    </div>
                </div>
                <div className='center'>
                    <Link className='link' to='/'>BNDLR</Link>
                </div>
                <div className='right'>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#contacts'>Contact</HashLink>
                    </div>
                    <div className='icons'>
                    <div className='searchIcon' onClick={() => {
                        dispatch(TOGGLE_WISHLIST({payload : false}))
                        dispatch(TOGGLE_CART({payload : false}))
                        dispatch(TOGGLE_SEARCH({payload : !openSearch}))
                    }}>
                        {openSearch ? <SearchOffOutlinedIcon /> : <SearchOutlinedIcon />}
                    </div>
                    <div className='favIcon' onClick={() => {
                        dispatch(TOGGLE_CART({payload : false}))
                        dispatch(TOGGLE_SEARCH({payload : false}))
                        dispatch(TOGGLE_WISHLIST({payload : !openWishlist}))
                    }}>
                        <FavoriteBorderOutlinedIcon />
                        <span>{wishlist.length}</span>
                    </div>
                    <div className='cartIcon' onClick={() => {
                        dispatch(TOGGLE_WISHLIST({payload : false}))
                        dispatch(TOGGLE_SEARCH({payload : false}))
                        dispatch(TOGGLE_CART({payload : !openCart}))
                    }}>
                        <ShoppingCartOutlinedIcon />
                        <span>{products.length}</span>
                    </div>
                    <div className='nightIcon' onClick={() => dispatch(TOGGLE_NIGHT())}>
                        {nightmode ? <BedtimeIcon /> : <LightModeIcon />}
                    </div>
                    <div className='menuIcon' onClick={handleMenu}>
                        <MenuIcon />
                    </div>
                        
                    </div>
                </div>
            </div>
                <Search open={openSearch} searchRef={searchRef}/>
                <Favorite wishRef={wishRef} open={openWishlist}/>
                <Cart cartRef={cartRef} open={openCart}/>
                <Menu open={openMenu} handleMenu={handleMenu}/>
        </div>
    )
};

export default NavBar;
