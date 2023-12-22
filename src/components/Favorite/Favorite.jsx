import React from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useDispatch, useSelector } from 'react-redux';
import useLoggedIn from '../../hooks/useLoggedIn';
import { ADD_TO_CART, REMOVE_WISH, RESET_WISH } from '../../redux/bagSlice';
import { STRIPE_CHECKOUT } from '../../utils/makeStripeThunk';
import { SET_NOTIFICATION } from '../../redux/notificationSlice';
import { TOGGLE_SIGN } from '../../redux/navigationSlice';
import './Favorite.scss';

const Favorite = ({wishRef, open}) => {
    const isLoggedIn = useLoggedIn();
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.bag);
    
    // Function to handle the payment from wishlist
    const handlePayment = (product) => {
        if (!isLoggedIn) {
            dispatch(TOGGLE_SIGN({payload: true}));
            return;
        }
        dispatch(STRIPE_CHECKOUT({
            cart: [
                {
                    product: {
                        _id : product._id,
                        title : product.title,
                        description : product.description,
                        price : product.price,
                        image1 : product.image1
                    },
                    quantity : 1
                }    
            ]   
        }))
    };

    return (
        <div ref={wishRef} className={`wish ${open ? 'active' : 'inactive'}`}>
            <h3>{wishlist.length ? 'Products in your wishlist' : 'Your wishlist is empty'}</h3>
            {!wishlist.length ? '' : 
            <div className='wish-list'>
            {wishlist?.map((item) => {
                const { product } = item;
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
                                product : {
                                    _id : product._id,
                                    title : product.title,
                                    description : product?.description,
                                    price : product.price,
                                    image1 : product.image1,
                                },
                                quantity: 1
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
