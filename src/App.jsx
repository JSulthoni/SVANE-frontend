import * as React from "react";

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

import './App.scss'

// Page Layout
const Layout = () => {
  return (
    <div className="app">
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}


// Web Pages
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
        path : '/success',
        element : <Success />
      },
    ]
  }
])



const App = () => {
  return <>
            <RouterProvider router={router} />
        </>;
};

export default App;