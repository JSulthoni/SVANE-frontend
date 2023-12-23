import { Link, useNavigate } from 'react-router-dom';
import './Categories.scss';

const Categories = () => {
    const navigate = useNavigate();

    // This function gives each of category cell random translate in each page reload
    const randomClassName = () => {
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
    };

    // This function routes user to trending/featured in search page
    const handleCategory = (type) => {
        
        if (typeof type !== 'string') {
            return;
        }

        navigate(`/search?search=${type}`)
    }

    return (
        <div className='categories' id='categories'>
            <h2>Our categories</h2>
            <div className='grid'>
                <div className='cell'>
                    <img src="https://images.pexels.com/photos/18516747/pexels-photo-18516747/free-photo-of-blonde-woman-posing-in-black-outfit.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='image1'/>
                    <img src="https://images.pexels.com/photos/18516753/pexels-photo-18516753/free-photo-of-blonde-woman-posing-in-black-outfit.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className={randomClassName()}/>
                    <button onClick={() => handleCategory('trending')}>
                        Trending
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
                    <button onClick={() => handleCategory('featured')}>
                        Featured
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Categories;
