import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Cart from '../Cart/Cart';
import useClickOutside from '../../hooks/useClickOutside';
import Favorite from '../Favorite/Favorite';
import Menu from '../Menu/Menu';
import './Navbar.scss'

const NavBar = () => {
    const favRef = useRef(null)
    const cartRef = useRef(null)
    const products = useSelector(((state) => state.cart.products))
    const wishlist = useSelector(((state) => state.cart.wishlist))
    const [openFav, setOpenFav] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    useClickOutside(favRef, () => {
        if (openFav) {
            setOpenFav(false)
        }
    })

    useClickOutside(cartRef, () => {
        if (openCart) {
            setOpenCart(false)
        }
    })

    const handleMenu = () => {
        setOpenCart(false)
        setOpenFav(false)
        setOpenMenu(!openMenu)
    }

    return (
        <div className='navbar'>
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
                    <Link className='link' to='/'>BUNDLER</Link>
                </div>
                <div className='right'>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#footer'>About</HashLink>
                    </div>
                    <div className='item'>
                        <HashLink smooth className='link' to='/#contacts'>Contact</HashLink>
                    </div>
                    <div className='icons'>
                    <div className='favIcon' onClick={() => {
                        setOpenCart(false)
                        setOpenFav(!openFav)
                    }}>
                        <FavoriteBorderOutlinedIcon />
                        <span>{wishlist.length}</span>
                    </div>
                    <div className='cartIcon' onClick={() => {
                        setOpenFav(false)
                        setOpenCart(!openCart)
                    }}>
                        <ShoppingCartOutlinedIcon />
                        <span>{products.length}</span>
                    </div>
                    <div className='menuIcon' onClick={handleMenu}>
                        <MenuIcon />
                    </div>
                    </div>
                </div>
            </div>
                <Favorite favRef={favRef} open={openFav}/>
                <Cart cartRef={cartRef} open={openCart}/>
                <Menu open={openMenu} handleClick={handleMenu}/>
        </div>
    );
}

export default NavBar;
