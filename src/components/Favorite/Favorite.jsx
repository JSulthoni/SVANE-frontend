import React from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useDispatch, useSelector } from 'react-redux';
import useLoggedIn from '../../hooks/useLoggedIn';
import { ADD_TO_CART, REMOVE_WISH, RESET_WISH } from '../../redux/contextSlice';
import { TOGGLE_SIGN } from '../../redux/navigationSlice';
import './Favorite.scss';

const Favorite = ({wishRef, open}) => {
    const isLoggedIn = useLoggedIn();
    const { wishlist } = useSelector((state) => state.context);
    const dispatch = useDispatch();

    // Function to handle the payment from wishlist
    const URL = import.meta.env.VITE_BACKEND_URL
    const handlePayment = async (item) => {
        console.log(item);
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
                            id : item.id,
                            title : item.title,
                            desc : item.desc,
                            price : item.price,
                            image : item.image,
                            quantity : item.quantity
                        }    
                    ]   
                })
            });
            const res =  await req.json();
            if (res.url) {
                window.location.assign(res.url) // User is redirected to this URL if request is fulfilled
                dispatch(REMOVE_WISH(item.id));
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
            {wishlist?.map((item) => (
                <div className='item' key={item.id}>
                    <img src={`${item.image}?auto=compress&cs=tinysrgb&w=360&dpr=1`} alt=''/>
                    <div className='details'>
                        <h4>{item.title}</h4>
                        <p>{item.desc.substring(0,100) + '...'}</p>
                    </div>
                    <button className='add' onClick={() => handlePayment(item)}>
                    <LocalMallIcon className='add' />
                    </button>
                    <button className='add' onClick={() => {
                        if (!isLoggedIn) {
                            dispatch(TOGGLE_SIGN({payload: true}));
                            return;
                        };
                        dispatch(ADD_TO_CART({
                            id : item?.id,
                            title : item?.title,
                            desc : item?.desc,
                            price : item?.price,
                            image : item?.image,
                            quantity : item?.quantity
                        }));
                    }}>
                    <AddShoppingCartIcon className='add'/>
                </button>
                    <DeleteOutlinedIcon className='delete' onClick={() => dispatch(REMOVE_WISH(item.id))}/>
                </div>
            ))}
            </div>}
            <span className='reset' onClick={() => dispatch(RESET_WISH())}>Empty List</span>
        </div>
    )
};

export default Favorite;
