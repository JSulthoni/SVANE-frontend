import { memo, useEffect, useState } from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import './FallbackDisplay.scss'


// Fallback display is used as placeholder for Discover page if search query returns empty array
const FallbackDisplay = ({search, maxPrice, sort}) => {
    const title = ['hoodie', 'shirt','trending', 'featured'];
    const index = Math.floor(Math.random() * title.length);
    const [product, setProduct] = useState(search || null);
    const [type, setType] = useState(title[index]);
    
    // useEffect to fetch either trending or featured
    useEffect(() => {
        setType(title[index]);
        setProduct(search);

        return () => {
            setProduct(null)
        }
    }, [search]);

    // Fetch the data
    const { data } = useFetch(`/products?search=${type}&sort=${sort}&price=${maxPrice}`);

    return (
        <>
            { product && data &&
            <div className='fallback'>
                <h2>Sorry, we could not find any '{product}' products</h2>
                <p>Consider our {type} selections.</p>
                <div className='list'>
                    {data.map((item) => <Card item={item} key={item._id}/>)}
                </div>
             </div>
            }
        </>
    );
}

export default memo(FallbackDisplay);
