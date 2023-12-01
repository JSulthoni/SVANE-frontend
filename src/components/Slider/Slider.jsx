import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Slider.scss';

const images = [
	'https://images.pexels.com/photos/18786754/pexels-photo-18786754.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
	'https://images.pexels.com/photos/3062594/pexels-photo-3062594.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
	'https://images.pexels.com/photos/2263952/pexels-photo-2263952.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
	'https://images.pexels.com/photos/1310501/pexels-photo-1310501.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
	'https://images.pexels.com/photos/944761/pexels-photo-944761.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1'
];

const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const nightmode = useSelector((state) => state.navigation.nightmode)

	// Function to slide the images
	const prevSlide = () => {
		setCurrentSlide(currentSlide === 0 ? 4 : (prev) => prev - 1);
	};
	const nextSlide = () => {
		setCurrentSlide(currentSlide === 4 ? 0 : (prev) => prev + 1);
	};

  	return (
		<div className='slider' id='home'>
		<div className='container' style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
			<img src={images[0]} alt='slider0' />
			<img src={images[1]} alt='slider1' />
			<img src={images[2]} alt='slider2' />
			<img src={images[3]} alt='slider3' />
			<img src={images[4]} alt='slider4' />
		</div>
		<div className='slider-title' style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'}}>
			<h1>First love to last sight</h1>
		</div>
		<div className='slider-buttons'>
			<div aria-label='prev-image' className='slider-button' onClick={prevSlide} style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'}}>
			<KeyboardArrowLeftIcon />
			</div>
			<div aria-label='next-image' className='slider-button' onClick={nextSlide} style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'}}>
			<KeyboardArrowRightIcon />
			</div>
		</div>
		<div className='slider-navigate'>
			<HashLink 
					scroll={(el) => el.scrollIntoView({ block: 'start' })}
					smooth 
					to='/#categories'>
			<div aria-label='slider-navigate' className='slider-down' style={{'backgroundColor' : !nightmode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'}}>
				<p>Discover</p>
				<KeyboardArrowDownIcon />
			</div>
			</HashLink>
		</div>
		</div>
	);
};

export default Slider;