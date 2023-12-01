import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Search.scss'
import List from '../../components/List/List';

const headerImage = [
    "https://images.pexels.com/photos/2672979/pexels-photo-2672979.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
    "https://images.pexels.com/photos/3062600/pexels-photo-3062600.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
    "https://images.pexels.com/photos/6224374/pexels-photo-6224374.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
    "https://images.pexels.com/photos/3571355/pexels-photo-3571355.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
    "https://images.pexels.com/photos/12674918/pexels-photo-12674918.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1"
];

const Search = () => {
    const [randomImageIndex, setRandomImageIndex] = useState(0);
    
    // Getting query parameter from URL
    const [searchParams] = useSearchParams();
    const queryParams = searchParams ? searchParams.get('search') : null;
    const navigate = useNavigate();
    
    // State for search parameters
    const [maxPrice, setMaxPrice] = useState(199);
    const [sort, setSort] = useState('');
    
    // Handling value returned from searchParams or subsequent input
    const [searchQuery, setSearchQuery] = useState(queryParams || '')
    // Reload the URL and set new search argument
    const handleSubmit = (event) => {
        event.preventDefault();
                
        if (typeof searchQuery !== 'string' || searchQuery.trim() === '') {
            return;
        }

        const encodedSearch = encodeURI(searchQuery);
        navigate(`/search?search=${encodedSearch}`, { replace: true })
    }
    
    // Disable the button if searchQuery is empty
    const isButtonDisabled = typeof searchQuery !== 'string' || searchQuery.trim() === '';

    // Getting mode from redux
    const nightmode = useSelector((state) => state.navigation.nightmode);

    // Getting random image from headerImage array
    // Using useEffect to run the getImage only when the component mounts
    useEffect(() => {
        setRandomImageIndex(getImage(headerImage));
    }, []);
    const getImage = (arr) => {
        return Math.floor(Math.random() * arr.length)
    };

    // Scroll window to top of page on first mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className='search'>
            <div className='left' style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
                <div className='search-filter'>
                        <h3>Search product name</h3>
                    <form autoComplete='off' onSubmit={handleSubmit} className='search-input search-bar'>
                        <input 
                            style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}
                            name='searchbar'
                            id='searchbar'
                            type='text' 
                            value={searchQuery}
                            placeholder='e.g: Featured'  
                            onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        <button disabled={isButtonDisabled}>Search</button>
                    </form>
                </div>
                <div className='search-filter'>
                    <h3>Filter by price</h3>
                    <div className='search-input'>
                        <span>0</span>
                        <input type='range' min={0} max={199} onChange={(e) => setMaxPrice(e.target.value)}/>
                        <span>{maxPrice}</span>
                    </div>
                </div>
                <div className='search-filter'>
                    <h3>Sort by</h3>
                    <div className='search-input'>
                        <input type='radio' id='asc' value='asc' name='price' onChange={(e) => setSort('asc')}/>
                        <label htmlFor='asc'>Price (Lowest first)</label> 
                    </div>
                    <div className='search-input'>
                        <input type='radio' id='desc' value='desc' name='price' onChange={(e) => setSort('desc')}/>
                        <label htmlFor='desc'>Price (Highest first)</label> 
                    </div>
                </div>
            </div>
            <div className='right'>
                    <img
                        className="search-image"
                        src={headerImage[randomImageIndex]}
                        alt="search-page-image"
                    />
                    <List search={queryParams || 'trending'} maxPrice={maxPrice} sort={sort} />
            </div>
        </div>
    );
}

export default Search;
