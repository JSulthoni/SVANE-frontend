import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../components/List/List';
import useFetch from '../../hooks/useFetch';
import './Products.scss';


const Products = () => {

    // Getting id from url
    const category = useParams().id;

    // State for search parameters
    const [maxPrice, setMaxPrice] = useState(199);
    const [sort, setSort] = useState('');
    const [subCats, setSubCats] = useState([]);

    // Fetching data from api
    const { data, loading, error } = useFetch(`/api/category?title=${category || ''}`); // Getting the catefories based on category
    const [ subcategory ] = data;

    
    // Function to filter and sort the data
    const filterSubcategory = () => {
        return subcategory?.subcategories.filter((subs) => subs.title !== 'all').sort((a,b) => a.title.localeCompare(b.title))
    }
    const filteredSubcategory = filterSubcategory();


    // Handle checkbox input
    const handleCheckbox = (event) => {
        const value = event.target.value
        const checked = event.target.checked
        setSubCats(checked ? [...subCats, value] : subCats.filter((item) => item !== value))
    };

    // Scroll window to top of page on first mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    return (
        <div className='products'>
            {loading ? '' :
            <div className='left'>
                <div className='products-filter'>
                    <h3>Product Categories</h3>
                    {filteredSubcategory.map((item) => {
                        return (
                    <div className='products-input' key={item._id}>
                        <input className='checkbox' type='checkbox' id={item._id} value={item.title} onChange={handleCheckbox}/>
                        <label htmlFor={item.title}>{item.title === 'tshirt' ? 't-shirt' : item.title}</label>
                    </div>
                        )
                    })}
                </div>
                <div className='products-filter'>
                    <h3>Filter by price</h3>
                    <div className='products-input'>
                        <span>0</span>
                        <input type='range' min={0} max={199} onChange={(event) => setMaxPrice(event.target.value)}/>
                        <span>{maxPrice}</span>
                    </div>
                </div>
                <div className='products-filter'>
                    <h3>Sort by</h3>
                    <div className='products-input'>
                        <input type='radio' id='asc' value='asc' name='price' onChange={(e) => setSort('asc')}/>
                        <label htmlFor='asc'>Price (Lowest first)</label> 
                    </div>
                    <div className='products-input'>
                        <input type='radio' id='desc' value='desc' name='price' onChange={(e) => setSort('desc')}/>
                        <label htmlFor='desc'>Price (Highest first)</label> 
                    </div>
                </div>
            </div>}
            <div className='right'>
                    { category === 'men' ? 
                    <img
                        className="cat-image"
                        src="https://images.pexels.com/photos/5102907/pexels-photo-5102907.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    /> : 
                    category === 'women' ? 
                    <img
                        className="cat-image"
                        src="https://images.pexels.com/photos/5119207/pexels-photo-5119207.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    /> : 
                    <img
                        className="cat-image"
                        src="https://images.pexels.com/photos/5120190/pexels-photo-5120190.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    /> }
                <List category={category} maxPrice={maxPrice} sort={sort} subCats={subCats}/>
            </div>
        </div>
    )
};

export default Products;
