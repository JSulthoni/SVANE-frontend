import { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './ErrorElement.scss';

// Error element is a slider as a fallback if a component failed to fetch
const ErrorElement = ({ maxHeight }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	
	const images = [
		'https://images.pexels.com/photos/19478673/pexels-photo-19478673.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
		'https://images.pexels.com/photos/17056662/pexels-photo-17056662.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
		'https://images.pexels.com/photos/9491361/pexels-photo-9491361.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
		'https://images.pexels.com/photos/2315309/pexels-photo-2315309.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
		'https://images.pexels.com/photos/3062597/pexels-photo-3062597.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
        'https://images.pexels.com/photos/2315212/pexels-photo-2315212.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
        'https://images.pexels.com/photos/3062631/pexels-photo-3062631.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
        'https://images.pexels.com/photos/16918127/pexels-photo-16918127.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
        'https://images.pexels.com/photos/6347920/pexels-photo-6347920.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
        'https://images.pexels.com/photos/842578/pexels-photo-842578.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1'
	];
	
	// Function to slide the images
	const index = images.length - 1
	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? index : (prev) => prev - 1);
	};
	const nextSlide = () => {
		setCurrentSlide(currentSlide === index ? 0 : (prev) => prev + 1);
	};

  	return (
		<div className='error' style={{maxHeight: `${maxHeight}dvh`}}>
            <div className='error-title'>
                <p>Server under maintenance. We are sorry for the inconvenience.</p>
            </div>
            <div className='error-wrapper' style={{transform:`translateX(-${currentSlide * 100}vw)`, width: `${images.length}00dvw`}}>
                {images.map((image, index) => <img key={index} src={image} alt={`slider${index}`} />)}
            </div>
            <div className='slider-buttons'>
                <div aria-label='prev-image' className='slider-button flexc-center' onClick={prevSlide}>
                <KeyboardArrowLeftIcon />
                </div>
                <div aria-label='next-image' className='slider-button flexc-center' onClick={nextSlide}>
                <KeyboardArrowRightIcon />
                </div>
            </div>
	</div>
	);
};

export default ErrorElement;