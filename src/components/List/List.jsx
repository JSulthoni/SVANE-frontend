import useFetch from '../../hooks/useFetch';
import FallbackDisplay from '../FallbackDisplay/FallbackDisplay';
import Card from '../Card/Card'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder';
import ErrorElement from '../ErrorElement/ErrorElement';
import './List.scss';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';

const List = ({category, maxPrice, sort, search, subCats}) => {
    const navigate = useNavigate();
    
    // Construct the API endpoint based on the presence of category and subCats or search
    let endpoint;
        if (category && subCats) {
            endpoint = `/products?category=${category}&subcategory=${subCats}&sort=${sort}&price=${maxPrice}`;
        } else if (search) {
            endpoint = `/products?search=${search}&sort=${sort}&price=${maxPrice}`;
        } else {
            endpoint = '/products'
        }

    const { data, loading, error } = useFetch(endpoint);
    const isData = Boolean(data.length);
    error && navigate('*');

    return (
        <>
            { 
            loading ? 
                <div className='list'>
                    {[...Array(10)].map((arr, i) => <CardPlaceholder key={i} />)}
                </div> 
            : isData ? 
                <div className='list'>
                    <Suspense fallback={<CardPlaceholder/>}>
                            {data.map((item) => (<Card item={item} key={item._id} />))} 
                    </Suspense>
                </div>
            :
                <FallbackDisplay search={search} maxPrice={maxPrice} sort={sort}/>
            }
        </>
    )
};

export default List;