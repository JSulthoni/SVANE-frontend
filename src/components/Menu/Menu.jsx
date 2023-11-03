import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Menu.scss'


const Menu = ({open, handleClick}) => {
    return (
        <div className={`menu ${open ? 'active' : 'inactive'}`}>
            <ul>
                <li onClick={() => handleClick()}>
                    <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                </li>
                <li onClick={() => handleClick()}>
                    <HashLink smooth className='link' to='/#categories'>Categories</HashLink>
                </li>
                <li onClick={() => handleClick()}>
                    <HashLink smooth className='link' to='/#footer'>About</HashLink>
                </li>
                <li onClick={() => handleClick()}>
                    <HashLink smooth className='link' to='/#contacts'>Contacts</HashLink>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
