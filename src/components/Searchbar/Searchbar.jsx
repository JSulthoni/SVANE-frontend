import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { TOGGLE_SEARCH } from '../../redux/navigationReducer';
import './Searchbar.scss';


const Searchbar = ({searchRef, open}) => {
    const nightmode = useSelector((state) => state.navigation.nightmode);
    const [searchQuery, setSearchQuery] = useState(undefined);
    const navigate = useNavigate();

    // Fetching data based on search argument
    const { data, loading } = useFetch(`/api/products?search=${searchQuery}`);
    const dispatch = useDispatch();

    const handleItem = () => {
        if (open) {
            dispatch(TOGGLE_SEARCH({payload : false}))
        }
    };

    // Navigate user to search page after submittin input
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (typeof searchQuery !== 'string') {
            return;
        }

        const encodedSearch = encodeURI(searchQuery);
        navigate(`/search?search=${encodedSearch}`, { replace: true });
        dispatch(TOGGLE_SEARCH({payload : false}))
        setSearchQuery('')
    };

    return (
        <div ref={searchRef} className={`searchbar ${open ? 'active' : 'inactive'}`} style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
            <div className='searchbar-bar'>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <input
                    style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}
                    value={searchQuery}
                    id='search'
                    name='search'
                    type='text' 
                    placeholder='e.g: Hoodie' 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    { searchQuery && 
                        <div className='clearIcon' onClick={() => setSearchQuery('')}>
                            <ClearOutlinedIcon />
                        </div> }
                </form>
            </div>
            { !loading && searchQuery &&
            <div className='searchbar-res'>
                {data.map((dat) => {
                    return (
                        <>
                            <Link 
                            key={dat._id} 
                            className='searchbar-item' 
                            to={`/product/${dat._id}`}
                            onClick={handleItem}
                            >
                            <img src={`${dat.image1}?auto=compress&cs=tinysrgb&w=160&dpr=1`} alt=''/>
                            <span>{dat.title}</span>
                            </Link>
                        </>
                    )
                })}
            </div> }
        </div>
    )
};

export default Searchbar;
