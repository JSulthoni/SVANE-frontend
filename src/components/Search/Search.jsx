import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { TOGGLE_SEARCH } from '../../redux/navigationReducer';
import './Search.scss'


const Search = ({searchRef, open}) => {
    const nightmode = useSelector((state) => state.navigation.nightmode)
    const [search, setSearch] = useState(undefined)
    const { data, loading } = useFetch(`/api/products?search=${search}`)
    const dispatch = useDispatch()

    const handleItem = () => {
        if (open) {
            dispatch(TOGGLE_SEARCH({payload : false}))
        }
    }

    return (
        <div ref={searchRef} className={`search ${open ? 'active' : 'inactive'}`} style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
            <div className='search-bar'>
                <input
                style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}
                value={search} 
                type='text' 
                placeholder='find product/bundle' 
                onChange={(e) => setSearch(e.target.value)}
                />
                {search && 
                    <div className='clearIcon' onClick={() => setSearch('')}>
                        <ClearOutlinedIcon />
                    </div>
                }
            </div>
            { !loading && search &&
            <div className='search-res'>
                {data.map((dat) => {
                    return (
                        <>
                            <Link 
                            key={dat._id} 
                            className='search-item' 
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
    );
}

export default Search;
