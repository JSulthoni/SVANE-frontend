import React from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import './List.scss';
import FallbackDisplay from '../FallbackDisplay/FallbackDisplay';

const List = ({category, maxPrice, sort, search, subCats}) => {
    
    // Construct the API endpoint based on the presence of category and subCats or search
    let endpoint;
        if (category && subCats) {
            endpoint = `/api/products?category=${category}&subcategory=${subCats}&sort=${sort}&price=${maxPrice}`;
        } else if (search) {
            endpoint = `/api/products?search=${search}&sort=${sort}&price=${maxPrice}`;
        } else {
            endpoint = '/api/products'
        }

    const { data, loading, error } = useFetch(endpoint);
    const isData = Boolean(data.length);
    
    return (
        <div className={isData ? 'list' : ''}>
            { 
            error ? 
                <div className='top'>
                    Error loading results. 
                    <span onClick={() => window.location.reload()}>
                        Refresh
                    </span>
                    &nbsp;the page or try again later.
                </div> 
            : 
            loading ? 
                <div className='top'>
                    <p>Loading products</p>
                </div> 
            : 
            isData ? 
                data.map((item) => (<Card item={item} key={item._id} />)) 
            :
            <FallbackDisplay search={search} maxPrice={maxPrice} sort={sort}/>
            }
        </div>
    )
};

export default List;