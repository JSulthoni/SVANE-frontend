import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../components/List/List';
import './Products.scss'
import useFetch from '../../hooks/useFetch';

const Products = () => {
    const catId = useParams().id
    console.log(catId)
    // const catId = parseInt(useParams().id)

    const [maxPrice, setMaxPrice] = useState(499)
    const [sort, setSort] = useState('')
    const [subCats, setSubCats] = useState([])

    const { data, loading, error } = useFetch(
        `/api/subcategory?title=${catId || ''}`
      );
    const [subcategory] = data
    const handleChange = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        setSubCats(checked ? [...subCats, value] : subCats.filter((item) => item !== value))
    }


    return (
        <div className='products'>
            {loading ? '' : <div className='left'>
                <div className='filterItem'>
                    <h3>Product Categories</h3>
                    {subcategory.subcategory.map((item) => {
                        return (
                    <div className='inputItem' key={item}>
                        <input className='checkbox' type='checkbox' id={item} value={item} onChange={handleChange}/>
                        <label htmlFor={item}>{item === 'tshirt' ? 't-shirt' : item}</label>
                    </div>
                        )
                    })}
                </div>
                <div className='filterItem'>
                    <h3>Filter by price</h3>
                    <div className='inputItem'>
                        <span>0</span>
                        <input type='range' min={0} max={499} onChange={(e) => setMaxPrice(e.target.value)}/>
                        <span>{maxPrice}</span>
                    </div>
                </div>
                <div className='filterItem'>
                    <h3>Sort by</h3>
                    <div className='inputItem'>
                        <input type='radio' id='asc' value='asc' name='price' onChange={(e) => setSort('asc')}/>
                        <label htmlFor='asc'>Price (Lowest first)</label> 
                    </div>
                    <div className='inputItem'>
                        <input type='radio' id='desc' value='desc' name='price' onChange={(e) => setSort('desc')}/>
                        <label htmlFor='desc'>Price (Highest first)</label> 
                    </div>
                </div>
            </div>}
            <div className='right'>
                    { catId === 'men' ? 
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/5102907/pexels-photo-5102907.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    /> : 
                    catId === 'women' ? 
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/5119207/pexels-photo-5119207.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    /> : 
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/5120190/pexels-photo-5120190.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    /> }
                <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={subCats}/>
            </div>
        </div>
    );
}

export default Products;
