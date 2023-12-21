import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import './FallbackDisplay.scss'

const FallbackDisplay = ({search, maxPrice, sort}) => {
    const title = ['hoodie', 'shirt', 'fedora'];
    const index = Math.floor(Math.random() * title.length);
    const [product, setProduct] = useState(search || null);
    const [type, setType] = useState(title[index] || null);

    // useEffect to fetch either trending or featured
    useEffect(() => {
        setType(title[index]);
        setProduct(search);

        return () => {
            setType(title[index]);
            setProduct(search)
        }
    }, [search]);

    // Fetch the data
    const { data } = useFetch(`/products?search=${type}&sort=${sort}&price=${maxPrice}`);

    return (
        <>
            { product && data &&
            <div className='error'>
                <h2>Sorry, we could not find any '{product}' products</h2>
                <p>Consider our {type} selections.</p>
                <div className='bottom'>
                    {data.map((item) => <Card item={item} key={item._id}/>)}
                </div>
             </div>
            }
        </>
    );
}

export default FallbackDisplay;
