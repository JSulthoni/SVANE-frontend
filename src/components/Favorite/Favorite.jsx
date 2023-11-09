import React from 'react';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import './Favorite.scss'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, REMOVE_WISH, RESET_WISH } from '../../redux/contextReducer';

const Favorite = ({favRef, open}) => {
    const wishlist = useSelector((state) => state.context.wishlist)
    const nightmode = useSelector((state) => state.context.nightmode)
    const dispatch = useDispatch()

    return (
        <div ref={favRef} className={`wish ${open ? 'active' : 'inactive'}`} style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
            <h3>{wishlist.length ? 'Products in your wishlist' : 'Your wishlist is empty'}</h3>
            {!wishlist.length ? '' : <div>
            {wishlist?.map((item) => (
                <div className='item' key={item.id}>
                    <img src={item.image} alt=''/>
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
            <span className='reset' onClick={() => dispatch(RESET_WISH())}>Empty List</span>
            </div>}
        </div>
    );
}

export default Favorite;
