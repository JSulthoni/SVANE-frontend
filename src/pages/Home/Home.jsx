import React from 'react';
import Slider from '../../components/Slider/Slider';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Categories from '../../components/Categories/Categories';
import Contacts from '../../components/Contacts/Contacts';
import SearchSection from '../../components/SearchSection/SearchSection';
import './Home.scss';

const Home = () => {
    return (
        <div className='home'>
                <Slider />
                <Categories />
                <FeaturedProducts type='trending' />
                <FeaturedProducts type='featured' />
                <SearchSection />
                <Contacts />
        </div>
    )
};

export default Home;
