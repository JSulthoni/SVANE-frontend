import React from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import './List.scss';

const List = ({catId, maxPrice, sort, search, subCats}) => {
    
    
    // Construct the API endpoint based on the presence of catId and subCats or search
    let endpoint;
        if (catId && subCats) {
            endpoint = `/api/products?category=${catId}&subcategory=${subCats}&sort=${sort}&price=${maxPrice}`;
        } else if (search) {
            endpoint = `/api/products?search=${search}&sort=${sort}&price=${maxPrice}`;
        } else {
            endpoint = '/api/products'
        }

    const { data, loading, error } = useFetch(endpoint)
    
    
    return (
        <div className='list'>
        {error && (
            <div className='top'>
                Error loading results. 
                <span onClick={() => window.location.reload()}>
                    Refresh
                </span>
                &nbsp;the page or try again later.
            </div>
        )}
            {error? 
                <div className='top'>
                    <p>Failed to load products. We are sorry for the inconvenience.</p>
                </div> : 
            loading ? 
                <div className='top'>
                    <p>Loading products</p>
                </div> : 
            data.map((item) => (<Card item={item} key={item._id} />))}
        </div>
    )
};

export default List;