import { useEffect, useState } from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, ADD_TO_WISH } from '../../redux/bagSlice';
import { TOGGLE_SIGN } from '../../redux/navigationSlice';
import { SET_NOTIFICATION } from '../../redux/notificationSlice';
import { STRIPE_CHECKOUT } from '../../utils/makeStripeThunk';
import useFetch from '../../hooks/useFetch';
import useLoggedIn from '../../hooks/useLoggedIn';
import './Product.scss';

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useLoggedIn();
    const [mainImg, setMainImg] = useState('image1');
    const [quantity, setQuantity] = useState(1);
    
    // Fetching single product data by id
    const id = useParams().id;
    const { data, loading, error } = useFetch(`/products/get/${id}?populate=*`);
    error && navigate('*');
    
    // Button control switch
    const buttonControl = (type) => {
        switch (type) {
            case 'ADDED TO CART':
                dispatch(ADD_TO_CART({
                    product : {
                        _id : data?._id,
                        title : data?.title,
                        description : data?.description,
                        price : data?.price,
                        image1 : data?.image1,
                    },
                    quantity
                    }))
                dispatch(SET_NOTIFICATION(type))
                break;
            case 'ADDED TO WISHLIST':
                dispatch(ADD_TO_WISH({
                    product: {
                        _id : data?._id,
                        title : data?.title,
                        description : data?.description,
                        price : data?.price,
                        image1 : data?.image1,
                    }
                    }))
                dispatch(SET_NOTIFICATION(type))
                break;
            default:
                break;
        }
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
    const handlePayment = (data) => {
        if (!isLoggedIn) {
            dispatch(TOGGLE_SIGN({payload: true}));
            return;
        }
        dispatch(STRIPE_CHECKOUT({
            cart: [
                {
                    product: {
                        _id : data._id,
                        title : data.title,
                        description : data.description,
                        price : data.price,
                        image1 : data.image1
                    },
                    quantity
                }    
            ],
            option: 'direct'   
        }))
    };

    // Scroll window to top of page on first mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className='product'>
            { loading ? 
            <>
                <div className='left'>
                    <p>Loading product...</p>
                </div> 
                <div className='right'>
                    <p>Loading product...</p>
                </div> 
            </>
            : 
            <>
                <div className='left'>
                    <div className='images'>
                        <img src={`${data?.image1}?auto=compress&cs=tinysrgb&w=360&&dpr=1` || 'https://placehold.co/400'} alt='' onClick={() => setMainImg('image1')}/>
                        <img src={`${data?.image2}?auto=compress&cs=tinysrgb&w=360&&dpr=1` || 'https://placehold.co/400'} alt='' onClick={() => setMainImg('image2')}/>
                    </div>
                    <div className='mainImage'>
                        <img src={data?.[mainImg] + '?auto=compress&cs=tinysrgb&w=1280&dpr=1' || 'https://placehold.co/400'} alt=''/>
                    </div>
                </div>
                <div className='right'>
                    <h3>{data?.title}</h3>
                    <span className='price'>${data?.price}</span>
                    <p>{data?.description}</p>
                    <div className='quantity'>
                        <button className='quantity-button' aria-label='decrease amount' onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}>-</button>
                        <span>{quantity}</span>
                        <button className='quantity-button' aria-label='increase amount' onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        <button className='cart-button button-green' onClick={handleCart}>
                            <AddShoppingCartIcon />
                        </button>
                    </div>
                    <button className='buy-button button-green' onClick={() => handlePayment(data)}>
                        <LocalMallIcon />BUY NOW
                    </button>
                    <button className='buy-button button-transparent' onClick={() => buttonControl('ADDED TO WISHLIST')}>
                        <FavoriteBorderIcon /> ADD TO WISHLIST
                    </button>
                    <div className='info'>
                        <span>Vendor: SVANE</span>
                        <span>Product Type: Fashion</span>
                        <span className='tag'>Tag: {data?.type?.map((item) => <span key={item}>{item}, </span>)}</span>
                        <hr />
                        <span>DESCRIPTION</span>
                        <hr />
                        <span>ADDITIONAL INFORMATION</span>
                        <hr />
                        <span>FAQ</span>
                    </div>
                </div>
            </>}
        </div>
    )
};

export default Product;
