import React from 'react';
import './Categories.scss'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Categories = () => {

    function randomClassName() {
        const randomNum = Math.floor(Math.random() * 4 + 1)

        if (randomNum < 1) {
            return 'Ynor'
        } else if (randomNum < 2) {
            return 'Yrev'
        } else if (randomNum < 3) {
            return 'Xnor'
        } else {
            return 'Xrev'
        }
    }

    return (
        <div className='categories' id='categories'>
            <div className='grid'>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/18516747/pexels-photo-18516747/free-photo-of-blonde-woman-posing-in-black-outfit.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/18516753/pexels-photo-18516753/free-photo-of-blonde-woman-posing-in-black-outfit.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button>
                        <HashLink smooth className='link' to='/#trending'>Trending</HashLink>
                    </button>
                </div>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/1036621/pexels-photo-1036621.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button>
                        <Link to="/products/women" className="link">Women</Link>
                    </button>
                </div>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/1036628/pexels-photo-1036628.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button>
                        <Link to="/products/men" className="link">Men</Link>
                    </button>
                </div>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/5622631/pexels-photo-5622631.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/5622637/pexels-photo-5622637.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button>
                        <Link to="/products/unisex" className="link">Unisex</Link>
                    </button>
                </div>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/6974969/pexels-photo-6974969.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/6974967/pexels-photo-6974967.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button>
                        <HashLink smooth className='link' to='/#featured'>Featured</HashLink>
                    </button>
                </div>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/5474307/pexels-photo-5474307.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/5474313/pexels-photo-5474313.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button>
                        <Link to="/products/unisex" className="link">Glasses</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Categories;
