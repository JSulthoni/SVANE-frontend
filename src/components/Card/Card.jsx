import React from 'react';
import { Link } from 'react-router-dom';
import makeMode from '../../utils/makeMode';
import './Card.scss';

const Card = ({item}) => {
    const getMode = makeMode();

    return (
        <Link className='link' to={`/product/${item._id}`}>
            <div className='card'>
                <div className='image'>
                {item?.newArrival && <span className='season'>New Season</span>}
                    <img src={`${item?.image1}?auto=compress&cs=tinysrgb&w=1600&dpr=1`} alt='' className='image1' />
                    <img src={`${item?.image2}?auto=compress&cs=tinysrgb&w=1600&dpr=1`} alt='' className='image2' />
                </div>
                <div className='info' style={getMode}>
                    <h3>{item.title}</h3>
                    <div className='prices'>
                        <h4>${item?.oldPrice || item?.price + 10 }</h4>
                        <h4>${item?.price}</h4>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default Card;
