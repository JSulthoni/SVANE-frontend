import React from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, REMOVE_WISH, RESET_WISH } from '../../redux/contextReducer';
import makeMode from '../../utils/makeMode';
import './Favorite.scss';

const Favorite = ({wishRef, open}) => {
    const wishlist = useSelector((state) => state.context.wishlist);
    const dispatch = useDispatch();
    const getMode = makeMode()

    return (
        <div ref={wishRef} className={`wish ${open ? 'active' : 'inactive'}`} style={getMode}>
            <h3>{wishlist.length ? 'Products in your wishlist' : 'Your wishlist is empty'}</h3>
            {!wishlist.length ? '' : 
            <div className='wish-list'>
            {wishlist?.map((item) => (
                <div className='item' key={item.id}>
                    <img src={`${item.image}?auto=compress&cs=tinysrgb&w=360&dpr=1`} alt=''/>
                    <div className='details'>
                        <h4>{item.title}</h4>
                        <p>{item.desc.substring(0,80) + '...'}</p>
                    </div>
                    <button className='add' onClick={() => dispatch(ADD_TO_CART({
                    id : item?.id,
                    title : item?.title,
                    desc : item?.desc,
                    price : item?.price,
                    image : item?.image,
                    quantity : item?.quantity
                    }))}>
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
