import React from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useDispatch, useSelector } from 'react-redux';
import useLoggedIn from '../../hooks/useLoggedIn';
import { ADD_TO_CART, REMOVE_WISH, RESET_WISH } from '../../redux/bagSlice';
import { TOGGLE_SIGN } from '../../redux/navigationSlice';
import './Favorite.scss';

const Favorite = ({wishRef, open}) => {
    const isLoggedIn = useLoggedIn();
    const { wishlist } = useSelector((state) => state.bag);

    const dispatch = useDispatch();

    // Function to handle the payment from wishlist
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const handlePayment = async (product) => {
        if (!isLoggedIn) {
            dispatch(TOGGLE_SIGN({payload: true}));
            return;
        }
        try {
            const req = await fetch(`${BACKEND_URL}/stripe/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    products : [
                        {
                            _id : product._id,
                            title : product.title,
                            price : product.price,
                            image : product.image1,
                            quantity : 1
                        }    
                    ]   
                })
            });
            const res =  await req.json();
            if (res.url) {
                window.location.assign(res.url) // User is redirected to this URL if request is fulfilled
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <div ref={wishRef} className={`wish ${open ? 'active' : 'inactive'}`}>
            <h3>{wishlist.length ? 'Products in your wishlist' : 'Your wishlist is empty'}</h3>
            {!wishlist.length ? '' : 
            <div className='wish-list'>
            {wishlist?.map((wish) => {
                const { product } = wish;
                return (
                    <div className='item' key={product._id}>
                        <img src={`${product.image1}?auto=compress&cs=tinysrgb&w=360&dpr=1`} alt=''/>
                        <div className='details'>
                            <h4>{product.title}</h4>
                            <p>{product.description.substring(0,100) + '...'}</p>
                        </div>
                        <button className='add' onClick={() => handlePayment(product)}>
                        <LocalMallIcon className='add' />
                        </button>
                        <button className='add' onClick={() => {
                            if (!isLoggedIn) {
                                dispatch(TOGGLE_SIGN({payload: true}));
                                return;
                            };
                            dispatch(ADD_TO_CART({
                                _id : product?._id,
                                title : product?.title,
                                desc : product?.desc,
                                price : product?.price,
                                image : product?.image1,
                                quantity : 1
                            }));
                        }}>
                        <AddShoppingCartIcon className='add'/>
                    </button>
                        <DeleteOutlinedIcon className='delete' onClick={() => dispatch(REMOVE_WISH(product._id))}/>
                    </div>
                )
            })}
            </div>}
            { Boolean(wishlist.length) && <span className='reset' onClick={() => dispatch(RESET_WISH())}>Empty List</span> }
        </div>
    )
};

export default Favorite;
