import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import RootLayout from "./layouts/RootLayout.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="products/id" element={<ProductDetailsPage />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    </StrictMode>
);