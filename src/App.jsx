import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Success from "./pages/Success/Success";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { SIGNIN_SUCCESS, SIGNOUT } from "./redux/authenticationSlice";
import './styles/global.scss';
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About/About";
import { GET_BAG } from "./utils/makeBagThunk";

if (import.meta.env.NODE_ENV === 'production') {
console.log('Welcome to SVANE')
}


// Page layout
const Layout = () => {
const mode = useSelector((state) => state.navigation.nightmode);
const user = JSON.parse(localStorage.getItem('user'));
const dispatch = useDispatch();

useEffect(() => {
	if (user) {
		dispatch(SIGNIN_SUCCESS(user));
    dispatch(GET_BAG());
	} else {
		dispatch(SIGNOUT())
	}
}, [user, dispatch]);

return (
	<div className={`app ${mode ? 'night' : ''}`}>
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
        path : '/search',
        element : <Search />
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