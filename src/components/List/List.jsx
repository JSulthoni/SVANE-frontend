import useFetch from '../../hooks/useFetch';
import FallbackDisplay from '../FallbackDisplay/FallbackDisplay';
import Card from '../Card/Card'
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
    
    if (error) {
        throw new Error('Something went wrong. We are sorry for the inconvenience');
    }
    
    return (
        <>
            { 
            loading ? 
                <div className='list'>
                    {[...Array(10)].map((arr, i) => <CardPlaceholder key={i} />)}
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