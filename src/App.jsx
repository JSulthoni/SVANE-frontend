import React, { useEffect } from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Success from "./pages/Success/Success";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import Discover from "./pages/Discover/Discover";
import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About/About";
import './styles/global.scss';

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
			element : <NotFound /> // Fallback page for any non existing route
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