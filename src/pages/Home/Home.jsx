import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import ErrorElement from '../../components/ErrorElement/ErrorElement';
import SuspenseElement from '../../components/SuspenseElement/SuspenseElement';
const Slider = lazy(() => import('../../components/Slider/Slider'));
const Categories = lazy(() => import('../../components/Categories/Categories'));
const Contacts = lazy(() => import('../../components/Contacts/Contacts'));
const SearchSection = lazy(() => import('../../components/SearchSection/SearchSection'));
import './Home.scss';

const Home = () => {
    return (
        <div className='home'>
        <ErrorBoundary FallbackComponent={ErrorElement} onReset={() => {}}>
            <Suspense fallback={<SuspenseElement/>}>
                <Slider />
            </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorElement} onReset={() => {}}>
            <Suspense fallback={<SuspenseElement/>}>
                <Categories />
            </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorElement} onReset={() => {}}>
                <FeaturedProducts type='trending' />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorElement} onReset={() => {}}>
                <FeaturedProducts type='featured' />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorElement} onReset={() => {}}>
            <Suspense fallback={<SuspenseElement/>}>
                <SearchSection />
            </Suspense>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorElement} onReset={() => {}}>
            <Suspense fallback={<SuspenseElement/>}>
                <Contacts />
            </Suspense>
        </ErrorBoundary>
        </div>
    )
};

export default Home;
