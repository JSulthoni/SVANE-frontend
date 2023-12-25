import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { TOGGLE_SEARCH } from '../../redux/navigationSlice';
import './Searchbar.scss';


const Searchbar = ({searchRef, open}) => {
    const [searchQuery, setSearchQuery] = useState(undefined);
    const [queryString, setQueryString] = useState(undefined)
    const navigate = useNavigate();

    // Fetching data based on search argument
    const { data, loading } = useFetch(`/products?search=${queryString}`);
    const dispatch = useDispatch();

    // Close the panel if user click/select a prpduct from the result
    const handleItem = () => {
        if (open) {
            dispatch(TOGGLE_SEARCH(false))
        }
    };

    // Navigate user to discover page if user submit the searchbar
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (typeof searchQuery !== 'string') {
            return;
        }

        const encodedSearch = encodeURI(searchQuery);
        navigate(`/discover?search=${encodedSearch}`, { replace: true });
        dispatch(TOGGLE_SEARCH(false))
        setSearchQuery('')
    };

    // This is a chain of debounching mechanism is intended to get the searchbar make a request only after
    // user stopped typing after a set period of time. This is intended to lower network traffic.
    const [debounceTimer, setDebounceTimer] = useState(null);

    const debouncedDispatch = () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        const newDebounceDispatch = setTimeout(() => {

            // Set the query string only if the condition is met 
            const condition = searchQuery.length !== 0 || searchQuery !== undefined
            if (condition) {
                setQueryString(searchQuery);
            }
        }, 500) // Timer for debounce is adjusted at 500ms

        setDebounceTimer(newDebounceDispatch);
    };

    // This useEffect is to execute the debounce mechanism
    useEffect(() => {
        debouncedDispatch();

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            setQueryString(undefined)
        }
        // The dependency array listens to the change in searchquery
    }, [searchQuery]);

    return (
        <div ref={searchRef} className={`searchbar panel ${open ? 'active' : 'inactive'}`}>
            <div className='searchbar-bar'>
                <form autoComplete='off' className='flexr-c-start' onSubmit={handleSubmit}>
                    <input
                    value={searchQuery}
                    id='searchbar'
                    name='searchbar'
                    type='text' 
                    placeholder='e.g: Hoodie' 
                    onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    { 
                        searchQuery ? 
                        (<div className='clear-icon' onClick={() => setSearchQuery('')}>
                            <ClearOutlinedIcon />
                        </div>) : null
                    }
                </form>
            </div>
            { (!loading && queryString) ?
            <div className='searchbar-res flexc-s-start'>
                {data.map((dat) => {
                    return (
                        <React.Fragment key={dat._id}>
                            <Link  
                            className='searchbar-item flexr-c-start' 
                            to={`/product/${dat._id}`}
                            onClick={handleItem}
                            >
                            <img src={`${dat.image1}?auto=compress&cs=tinysrgb&w=160&dpr=1`} alt=''/>
                            <span>{dat.title}</span>
                            </Link>
                        </React.Fragment>
                    )
                })} 
            </div> : null }
        </div>
    )
};

export default memo(Searchbar);
