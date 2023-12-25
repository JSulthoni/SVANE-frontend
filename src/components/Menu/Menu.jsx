import { memo } from 'react'
import { HashLink } from 'react-router-hash-link';
import './Menu.scss';


const Menu = ({open, handleMenu}) => {

    return (
        <div className={`menu ${open ? 'active' : 'inactive'}`}>
            <h2>SVANNE</h2>
            <ul>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/#'>Homepage</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink 
                    scroll={(el) => el.scrollIntoView({ block: 'start' })}
                    smooth 
                    className='link' to='/#categories'>Categories</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/discover#top'>Discover</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/about#top'>About</HashLink>
                </li>
                <li onClick={() => handleMenu()}>
                    <HashLink smooth className='link' to='/#contacts'>Contacts</HashLink>
                </li>
            </ul>
        </div>
    )
};

export default memo(Menu);