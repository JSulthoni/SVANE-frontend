import React from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './FeaturedProducts.scss'

const FeaturedProducts = ({ type }) => {
    const navigate = useNavigate()
    const {data, loading, error} = useFetch(`/api/products?type=${type}&limit=7`);

    // This function routes user to trending/featured in search page
    const handleCategory = (type) => {
    
        if (typeof type !== 'string') {
            return;
        }

        navigate(`/search?search=${type}`)
    }

    return (
        <div className='featuredProducts'>
            {error ? 
                <div className='top'>
                    <p>Failed to load products. We are sorry for the inconvenience.</p>
                </div> : 
            loading ? 
                <div className='top'>
                    <p>Loading products</p>
                </div> : 
            <>
                <div className='top' id={type}>
                    {type === 'trending' ? 
                    <>
                    <h2 onClick={() => handleCategory('trending')}>Step into Fashion Excellence</h2>
                    <p>Elevate your style with our latest trending product! This fashion-forward item is making waves in the fashion world, and it's no surprise why. With its innovative design and unparalleled quality, it's the perfect addition to your wardrobe. Stay ahead of the style curve and turn heads wherever you go. Don't miss out on this season's must-have fashion piece. Get yours today and be part of the trendsetters</p> 
                    </>
                    : 
                    <>
                    <h2 onClick={() => handleCategory('featured')}>Where Style Takes Center Stage</h2>
                    <p>Discover our featured product, a true masterpiece in the world of fashion. Handpicked for its exceptional craftsmanship and timeless appeal, this product embodies sophistication and elegance. Whether you're dressing up for a special occasion or adding a touch of luxury to your everyday look, this item is the perfect choice. It's a symbol of your impeccable taste and an investment in enduring style. Make it yours and experience the essence of refined fashion.</p>
                    </>}
                </div>
                <div className='bottom'>
                    {data.map((item) => <Card item={item} key={item._id}/>)}
                </div>
                <button onClick={() => handleCategory(type)}>
                    Discover More <KeyboardArrowRightIcon />
                </button>
            </>
            }
        </div>
    )
};

export default FeaturedProducts;
