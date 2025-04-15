import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <CartProvider>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/products' element={<ProductList />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='*' element={<h1>404 - Page Not Found</h1>} />
                </Routes>

                <Footer />
            </BrowserRouter>
        </CartProvider>
    </StrictMode>
);