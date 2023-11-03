import React from 'react';
import './FeaturedProducts.scss'
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';

const FeaturedProducts = ({ type }) => {
    // fix query and connection strings
    const {data, loading, error} = useFetch(`/api/products?category=&subcategory=&sort=&price=`)
    // `/products?populate=*&[filter][type][$in]=${type}`

    return (
        <div className='featuredProducts'>
            <div className='top' id={type}>
                <h2>{`${type} products`}</h2>
                {type === 'trending' ? 
                <p>Elevate your style with our latest trending product! This fashion-forward item is making waves in the fashion world, and it's no surprise why. With its innovative design and unparalleled quality, it's the perfect addition to your wardrobe. Stay ahead of the style curve and turn heads wherever you go. Don't miss out on this season's must-have fashion piece. Get yours today and be part of the trendsetters</p> : 
                <p>Discover our featured product, a true masterpiece in the world of fashion. Handpicked for its exceptional craftsmanship and timeless appeal, this product embodies sophistication and elegance. Whether you're dressing up for a special occasion or adding a touch of luxury to your everyday look, this item is the perfect choice. It's a symbol of your impeccable taste and an investment in enduring style. Make it yours and experience the essence of refined fashion.</p>}
                </div>
            {loading ? 'loading' : 
            <div className='bottom'>
                {data.filter((item) => item.type.includes(type)).slice(0 , 5).map((item) => <Card item={item} key={item._id}/>)}
            </div> 
            }
        </div>
    );
}

export default FeaturedProducts;