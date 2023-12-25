import Card from '../Card/Card';
import useFetch from '../../hooks/useFetch';
import FallbackDisplay from '../FallbackDisplay/FallbackDisplay';
import ErrorElement from '../ErrorElement/ErrorElement';
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder';
import './List.scss';

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
        <>
            { 
            loading ? 
                <div className='list'>
                    {[...Array(10)].map((arr, i) => <CardPlaceholder key={i} />)}
                </div> 
            : error ? 
                <div className='top'>
                    <ErrorElement maxHeight={50} />
                </div> 
            : isData ? 
                <div className='list'>
                    {data.map((item) => (<Card item={item} key={item._id} />))} 
                </div>
            :

                    <FallbackDisplay search={search} maxPrice={maxPrice} sort={sort}/>

            }
        </>
    )
};

export default List;