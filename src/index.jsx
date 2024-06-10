import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './style.css';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import MainLayout from './layouts/mainLayout';
import AuthLayout from './layouts/authLayout';
import { AuthProvider } from './components/context/auth.context';
import { ProductsProvider } from './components/context/productsContext';
import { CartProvider } from './components/context/cartcontext';
import ProductDetail from './pages/productDetail';
import ProtectedRoutes, { AuthRoute } from './components/ProtectedRoutes'
import Shop from './pages/shop';
import Contact from './pages/contact';

document.body.innerHTML = '<main id="app"></main>';

const root = createRoot(document.getElementById('app'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductsProvider>
      <CartProvider>
        <ProtectedRoutes>
          <MainLayout />
        </ProtectedRoutes>
      </CartProvider>
    </ProductsProvider>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthRoute> <AuthLayout /></AuthRoute>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]);

root.render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>

  </AuthProvider>);
