import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (error) {
            resetErrorBoundary();
        } else {
            navigate('/');
        }
    }

    return (
        <div className='notfound flexc-center'>
            <div className='notfound-wrapper flexc-center'>
                <h2>Oops!</h2>
                <p>Sorry, we could not process what you are looking for</p>
                <p><span onClick={() => handleClick()}>Reload</span></p>
            </div>
        </div>
    )
};

export default NotFound;
