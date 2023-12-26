import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Slider.scss';

const images = [
	'https://images.pexels.com/photos/3062594/pexels-photo-3062594.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1',
	'https://images.pexels.com/photos/3756158/pexels-photo-3756158.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1',
	'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1',
	'https://images.pexels.com/photos/1310501/pexels-photo-1310501.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1',
	'https://images.pexels.com/photos/944761/pexels-photo-944761.jpeg?auto=compress&cs=tinysrgb&w=1280&dpr=1'
];

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);	
	
	// Function to slide the images
	const index = images.length - 1
	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? index : (prev) => prev - 1);
	};
	const nextSlide = () => {
		setCurrentSlide(currentSlide === index ? 0 : (prev) => prev + 1);
	};

  	return (
		<div className='slider' id='home'>
		<div className='slider-wrapper' style={{transform:`translateX(-${currentSlide * 100}vw)`, width: `${images.length}00dvw`}}>
			{images.map((image, index) => <img key={index} src={image} loading='lazy' alt={`slider${index}`} />)}
		</div>
		<div className='slider-title'>
			<h1>First love to last sight</h1>
		</div>
		<div className='slider-buttons'>
			<div aria-label='prev-image' className='slider-button flexc-center' onClick={prevSlide}>
			<KeyboardArrowLeftIcon />
			</div>
			<div aria-label='next-image' className='slider-button flexc-center' onClick={nextSlide}>
			<KeyboardArrowRightIcon />
			</div>
		</div>
		<div className='slider-navigate'>
			<HashLink 
					scroll={(el) => el.scrollIntoView({ block: 'start' })}
					smooth 
					to='/#categories'>
			<div aria-label='slider-navigate' className='slider-down'>
				<p>Discover</p>
				<KeyboardArrowDownIcon />
			</div>
			</HashLink>
		</div>
		</div>
	);
};

export default Slider;