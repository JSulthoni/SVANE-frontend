import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import './Product.scss'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, ADD_TO_WISH } from '../../redux/contextReducer';

const Product = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const [mainImg, setMainImg] = useState('image1')
    const [quantity, setQuantity] = useState(1)
    const {data, loading} = useFetch(`/api/products/find/${id}?populate=*`)

    return (
        <div className='product'>
            { loading ? '' : 
            (
            <>
                <div className='left'>
                <div className='images'>
                    <img src={`${data?.image1}?auto=compress&cs=tinysrgb&w=1600&dpr=1` || 'https://placehold.co/400'} alt='' onClick={() => setMainImg('image1')}/>
                    <img src={`${data?.image2}?auto=compress&cs=tinysrgb&w=1600&dpr=1` || 'https://placehold.co/400'} alt='' onClick={() => setMainImg('image2')}/>
                </div>
                <div className='mainImage'>
                    <img src={data?.[mainImg] || 'https://placehold.co/400'} alt=''/>
                </div>
            </div>
            <div className='right'>
                <h3>{data?.title}</h3>
                <span className='price'>${data?.price}</span>
                <p>{data?.description}</p>
                <div className='quantity'>
                    <button onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                </div>
                <button className='add' onClick={() => dispatch(ADD_TO_CART({
                    id : data?._id,
                    title : data?.title,
                    desc : data?.description,
                    price : data?.price,
                    image : data?.image1,
                    quantity
                    }))}>
                    <AddShoppingCartIcon />ADD TO CART
                </button>
                <button className='item' onClick={() => dispatch(ADD_TO_WISH({
                id : data?._id,
                title : data?.title,
                desc : data?.description,
                price : data?.price,
                image : data?.image1,
                quantity : parseInt(1)
                }))}>
                    <FavoriteBorderIcon /> ADD TO WISHLIST
                </button>
                <div className='info'>
                    <span>Vendor: BUNDLER</span>
                    <span>Product Type: Fashion</span>
                    <span className='tag'>Tag: {data?.type.map((item) => <span>{item} </span>)}</span>
                <hr />
                    <span>DESCRIPTION</span>
                    <hr />
                    <span>ADDITIONAL INFORMATION</span>
                    <hr />
                    <span>FAQ</span>
                </div>
            </div>
            </>
            )}
        </div>
    );
}

export default Product;
