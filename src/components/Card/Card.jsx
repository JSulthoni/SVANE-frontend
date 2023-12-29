import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({item}) => {
    return (
        <Link className='link' to={`/product/${item._id}`}>
            <div className='card'>
                <div className='image'>
                {item?.newArrival && <span className='season'>New Season</span>}
                    <img src={`${item?.image1}?auto=compress&cs=tinysrgb&h=640&dpr=1`} alt='image1' loading='lazy' className='image1' />
                    <img src={`${item?.image2}?auto=compress&cs=tinysrgb&h=640&dpr=1`} alt='image2' loading='lazy' className='image2' />
                </div>
                <div className='info'>
                    <h3>{item.title}</h3>
                    <div className='prices flexr-c-start'>
                        <h4>${ item?.price + 10 }</h4>
                        <h4>${ item?.price }</h4>
                    </div>
                </div>
            </div>
        </Link> 
    )
};

export default Card;
