import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';

const Card = ({item}) => {
    return (
        <Link className='link' to={`/product/${item._id}`}>
            <div className='card'>
                <div className='image'>
                {item?.newArrival && <span className='season'>New Season</span>}
                    <img src={`${item?.image1}?auto=compress&cs=tinysrgb&w=1600&dpr=1`} alt='' className='image1' />
                    <img src={`${item?.image2}?auto=compress&cs=tinysrgb&w=1600&dpr=1`} alt='' className='image2' />
                </div>
                <h3>{item.title}</h3>
                <div className='prices'>
                    <h4>${item?.oldPrice || item?.price + 10 }</h4>
                    <h4>${item?.price}</h4>
                </div>
            </div>
        </Link>
    )
};

export default Card;
