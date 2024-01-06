import { useEffect } from 'react';
import useLoggedIn from '../../hooks/useLoggedIn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RESET_CHECKOUT } from '../../redux/checkoutSlice';
import { STRIPE_CHECKOUT } from '../../utils/makeCheckoutThunk';
import stripeicon from '../../assets/stripeicon.svg'
import './Checkout.scss'


const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedin = useLoggedIn();
    const { payload, option } = useSelector((state) => state.checkout);

    // Calculating total price in checkout
    const totalPrice = () => {
        let total = 0;
        payload.forEach((item) => (total += item.quantity * item.product.price));
        return total.toFixed(2);
    };

    // Scroll window to top of page on first mount
    useEffect(() => {
        (!isLoggedin || !payload || !option) && navigate('/');
        window.scrollTo(0, 0);
    }, [isLoggedin, payload, option]);

    const handleCancel = () => {
        dispatch(RESET_CHECKOUT());
        navigate('/');
    };

    const handlePayment = (provider) => {
        switch (provider) {
          case 'stripe':
            dispatch(STRIPE_CHECKOUT(payload, option));
            break;
          default:
            break;
        }
    };

    return (
        <section className='checkout flexc-center'>
                <h3>SVANE CHECKOUT</h3>
            <div className='checkout-wrapper flexr-s-start'>
                <div className='left flexc-s-start'>
                    <div className='checkout-list'>
                        { payload?.map((item) => {
                            const { product } = item;
                            return (
                                <div className='checkout-item flexr-s-start' key={item._id}>
                                <img src={`${product.image1}?auto=compress&cs=tinysrgb&h=640&dpr=1`} alt={product.title}/>
                                <div className='checkout-details flexc-s-start'>
                                    <h4>{product.title}</h4>
                                    <p>{product.description}</p>
                                    <div className='checkout-number'>
                                        <span>Quantity</span><span>: {item.quantity}</span>
                                    </div>
                                    <div className='checkout-number'>
                                        <span>Subtotal ($)</span><span>: {item.quantity * product.price}.00</span>
                                    </div>
                                </div>
                            </div>
                            )}
                        ) }
                    </div>
                </div>
                <div className='right'>
                    <div className='checkout-payment flexc-s-start'>
                        <div className='checkout-total flexr-c-between'>
                            <span>Total ($)</span><span>: {totalPrice()}</span>
                        </div>
                            <span>Select payment method :</span>
                        <div className='flexr-c-between checkout-button'>
                            <p>STRIPE</p>
                            <button 
                                onClick={() => handlePayment('stripe')}
                                className='flexc-center checkout-icon'>
                                    <img
                                        className='checkout-icon'
                                        src={stripeicon} 
                                        loading='lazy' 
                                        alt='stripe purchase button' />
                                </button>
                        </div>
                        <div className='flexr-c-between'>
                            <button 
                                onClick={() => handleCancel()}
                                className='button-transparent'>CANCEL CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
};


export default Checkout;
