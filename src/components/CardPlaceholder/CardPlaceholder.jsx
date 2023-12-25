import './CardPlaceholder.scss'


// This compoenent is a placeholder for card during loading state
const CardPlaceholder = () => {
    return (
        <div className='placeholder-card placeholder-animation flexc-s-start'>
        <div className='placeholder-image flexc-center'>
            <h3>SVANE</h3>
        </div>
        <div className='placeholder-info'>
            <h3>Loading Product</h3>
            <div className='placeholder-prices'>
                <h4>Loading Product</h4>
            </div>
        </div>
    </div>
    );
}

export default CardPlaceholder;
