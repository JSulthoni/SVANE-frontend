import React from 'react';
import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import './List.scss'

const List = ({catId, maxPrice, sort, subCats}) => {
    
    const { data, loading, error } = useFetch(`/api/products?category=${catId}&subcategory=${subCats}&sort=${sort}&price=${maxPrice}`)

    return (
        <div className='list'>
            {loading ? '' : data.map((item) => (<Card item={item} key={item._id} />))}
        </div>
    );
}

export default List;