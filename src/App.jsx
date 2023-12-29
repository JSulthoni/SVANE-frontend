import { lazy, Suspense } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import SuspenseElement from './components/SuspenseElement/SuspenseElement';
import { ErrorBoundary } from "react-error-boundary";
import './styles/global.scss';
import { useEffect } from "react";
import { REFRESH_USER } from "./utils/makeAuthThunk";
const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const Product = lazy(() => import('./pages/Product/Product'));
const Success = lazy(() => import('./pages/Success/Success'));
const Discover = lazy(() => import('./pages/Discover/Discover'));
const About = lazy(() => import('./pages/About/About'));

if (import.meta.env.NODE_ENV === 'production') {
  console.log('Welcome to SVANE')
}


// Page layout
const Layout = () => {
const nightmode = useSelector((state) => state.navigation.nightmode);
const dispatch = useDispatch();

useEffect(() => {
	dispatch(REFRESH_USER());
	return () => {}
}, [])

return (
	<div className={`app ${nightmode ? 'night' : ''}`}>
		<NavBar />
			<ErrorBoundary FallbackComponent={NotFound} onReset={() => {}}>
				<Suspense fallback={<SuspenseElement />}>
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		<Footer />
	</div>
)
};


// Page routes
const router = createBrowserRouter([
	{
		path : '/',
		element : <Layout />,
		children : [
			{
				path : '/',
				element : <Home />
			},
			{
				path : '/product/:id',
				element : <Product />
			},
			{
				path : '/products/:id',
				element : <Products />
			},
			{
				path : '/about/',
				element : <About />
			},
			{
				path : '/discover',
				element : <Discover />
			},
			{
				path : '/success',
				element : <Success />
			},
			{
				path : '*',
				element : <NotFound /> // Fallback page for failed route
			},
		]
	}
]);



const App = () => {
  return <>
            <RouterProvider router={router} />
        </>;
};

export default App;