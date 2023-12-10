import React from 'react';
import icon from '../../favicon.png'
import './About.scss'

const About = () => {
    return (
        <section className='about'>
            <div className='about-title'>
                <img src={icon} alt='icon' />
            </div>
            <p><span className='logo'>SVANE</span> began in 2023 as a portofolio project. The initial goal was to create Fullstack M.E.R.N online shop application designed for ease-of-use and high responsiveness, ensuring website's UI and functionality to various screen sizes.</p>
            <div className='about-button'>
                <button><a href='https://github.com/JSulthoni' target='_blank'>Author's Profile</a></button>
                <button><a href='https://github.com/JSulthoni/SVANE-frontend' target='_blank'>Github Code</a></button>
            </div>
        </section>
    );
}

export default About;
