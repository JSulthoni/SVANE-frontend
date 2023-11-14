import React from 'react';
import Slider from '../../components/Slider/Slider';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Categories from '../../components/Categories/Categories';
import Contacts from '../../components/Contacts/Contacts';
import './Home.scss';

const Home = () => {
    return (
        <div className='home'>
            <section>
                <Slider />
            </section>
            <section>
                <FeaturedProducts type='featured' />
            </section>
            <section>
                <Categories />
            </section>
            <section>
                <FeaturedProducts type='trending' />
                <Contacts />
            </section>
        </div>
    )
};

export default Home;
