import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import './List.scss';
import FallbackDisplay from '../FallbackDisplay/FallbackDisplay';
import ErrorElement from '../ErrorElement/ErrorElement';

const List = ({category, maxPrice, sort, search, subCats}) => {
    
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
    
    return (
        <div className='list'>
            { loading ? 
                <div className='top'>
                    <p>Loading products</p>
                </div> 
            : error ? 
                <div className='top'>
                    <ErrorElement maxHeight={50} />
                </div> 
            : isData ? 
                data.map((item) => (<Card item={item} key={item._id} />)) 
            :
                <FallbackDisplay search={search} maxPrice={maxPrice} sort={sort}/>
            }
        </div>
    )
};

export default List;