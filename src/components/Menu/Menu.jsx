import React from 'react';
import { useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import './Menu.scss'


const Menu = ({open, handleMenu}) => {

    const nightmode = useSelector(((state) => state.navigation.nightmode))

    return (
        <div className={`menu ${open ? 'active' : 'inactive'}`} style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
            <ul>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/#categories'>Categories</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/#footer'>About</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/#contacts'>Contacts</HashLink>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
