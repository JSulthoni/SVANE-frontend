import React, { useState } from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, ADD_TO_WISH } from '../../redux/contextSlice';
import useFetch from '../../hooks/useFetch';
import useLoggedIn from '../../hooks/useLoggedIn';
import './Product.scss';
import { TOGGLE_SIGN } from '../../redux/navigationSlice';

const Product = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const isLoggedIn = useLoggedIn();
    const [mainImg, setMainImg] = useState('image1');
    const [quantity, setQuantity] = useState(1);
    const [notif, setNotif] = useState('');
    const openNotif = Boolean(notif);

    // Fetching single product data
    const { data, loading } = useFetch(`/api/products/get/${id}?populate=*`);
    
    // Button control switch
    const buttonControl = (type) => {
        switch (type) {
            case 'ADDED TO CART':
                dispatch(ADD_TO_CART({
                    id : data?._id,
                    title : data?.title,
                    desc : data?.description,
                    price : data?.price,
                    image : data?.image1,
                    quantity
                    }))
                notification(type);
                break;
            case 'ADDED TO WISHLIST':
                dispatch(ADD_TO_WISH({
                    id : data?._id,
                    title : data?.title,
                    desc : data?.description,
                    price : data?.price,
                    image : data?.image1,
                    quantity : parseInt(1)
                    }))
                notification(type);
                break;
            default:
                break;
        }
    };
    
    // Setting the notification
    const notification = (type) => {
        setTimeout(() => {
            setNotif('')
        }, 3000)
        setNotif(type)
    };

    // Add to cart function
    const handleCart = () => {
        if (!isLoggedIn) {
            dispatch(TOGGLE_SIGN({payload: true}));
            return;
        }
        buttonControl('ADDED TO CART');
    };

    // Stripe payment function
    const URL = import.meta.env.VITE_BACKEND_URL
    const handlePayment = async () => {
        try {
            if (!isLoggedIn) {
                dispatch(TOGGLE_SIGN({payload: true}));
                return;
            }
            const req = await fetch(`${URL}/api/stripe/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    products : [
                        {
                            id : data?._id,
                            title : data?.title,
                            desc : data?.description,
                            price : data?.price,
                            image : data?.image1,
                            quantity
                        }    
                    ]   
                })
            })
            const res =  await req.json();
            if (res.url) {
                window.location.assign(res.url) // User is redirected to this URL if request is fulfilled
                setNotif('');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            notification('Something went wrong during checkout!');
        }
    };
    
    return (
        <div className='product'>
            { 
                loading ? '' : 
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
                    <button aria-label='decrease amount' onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}>-</button>
                    <span>{quantity}</span>
                    <button aria-label='increase amount' onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                    <button onClick={handleCart}>
                        <AddShoppingCartIcon />
                    </button>
                </div>
                <button className='add' onClick={handlePayment}>
                    <LocalMallIcon />BUY NOW
                </button>
                <button className='add' onClick={() => buttonControl('ADDED TO WISHLIST')}>
                    <FavoriteBorderIcon /> ADD TO WISHLIST
                </button>
                <div className='info'>
                    <span>Vendor: SVANE</span>
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
            <div 
                className={`notification ${openNotif ? 'active' : 'inactive'}`}>
                <p>{data?.title}</p>
                <p>{notif}</p>
            </div>
        </div>
    )
};

export default Product;
