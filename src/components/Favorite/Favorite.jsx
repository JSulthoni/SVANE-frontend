import React from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import './Favorite.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeWish, resetWish } from '../../redux/cartReducer';

const Favorite = ({favRef, open}) => {
    const wishlist = useSelector((state) => state.cart.wishlist)
    const dispatch = useDispatch()

    return (
        <div ref={favRef} className={`wish ${open ? 'active' : 'inactive'}`}>
            <h3>Products in your wishlist</h3>
            {wishlist?.map((item) => (
                <div className='item' key={item.id}>
                    <img src={item.image} alt=''/>
                    <div className='details'>
                        <h4>{item.title}</h4>
                        <p>{item.desc.substring(0,80) + '...'}</p>
                    </div>
                    <button className='add' onClick={() => dispatch(addToCart({
                    id : item?.id,
                    title : item?.title,
                    desc : item?.desc,
                    price : item?.price,
                    image : item?.image,
                    quantity : item?.quant
                    }))}>
                    <AddShoppingCartIcon className='add'/>
                </button>
                    <DeleteOutlinedIcon className='delete' onClick={() => dispatch(removeWish(item.id))}/>
                </div>
            ))}
            <span className='reset' onClick={() => dispatch(resetWish())}>Empty List</span>
        </div>
    );
}

export default Favorite;
