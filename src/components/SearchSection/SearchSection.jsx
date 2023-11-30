import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SearchSection.scss';


const SearchSection = () => {
    const [searchQuery, setSearchQuery] = useState(undefined);
    const nightmode = useSelector((state) => state.navigation.nightmode);
    const navigate = useNavigate();

    // Navigate user to search page after submittin input
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (typeof searchQuery !== 'string') {
            return;
        }

        const encodedSearch = encodeURI(searchQuery);
        navigate(`/search?search=${encodedSearch}`);
    };

    return (
        <div className='searchsection'>
                <div className='top'>
                    <h2>Discover Your Style, Effortlessly.</h2>
                    <p>Embark on a journey of style exploration with our powerful search feature. Find the latest fashion trends, timeless classics, and everything in between. Your perfect look is just a search away. Unleash the possibilities, and let your unique style shine through effortlessly. Start your fashion adventure now.</p>
                </div>
                <div className='bottom'>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <label htmlFor='search'>Your fashion dream:</label>
                        <input 
                            style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}
                            id='search'
                            name='search'
                            type='text' 
                            defaultValue={searchQuery}
                            placeholder='e.g: Shirt'
                            onChange={(event) => setSearchQuery(event.target.value)}    
                            />
                    </form>
                </div>
        </div>
    );
}

export default SearchSection;