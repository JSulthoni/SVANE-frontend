import { lazy, Suspense } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import SuspenseElement from './components/SuspenseElement/SuspenseElement';
import { ErrorBoundary } from "react-error-boundary";
import './styles/global.scss';
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

return (
	<div className={`app ${nightmode ? 'night' : ''}`}>
		<NavBar />
		<Outlet />
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
  		<ErrorBoundary FallbackComponent={NotFound} onReset={() => {}}>
			<Suspense fallback={<SuspenseElement />}>
            	<RouterProvider router={router} />
			</Suspense>
		</ErrorBoundary>
        </>;
};

export default App;