import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './index.css';

import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import CheckoutPage from './pages/CheckoutPage.tsx';
import {CartProvider} from './context/CartContext';
import RootLayout from "./layouts/RootLayout.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SuccessPage from "./pages/SuccessPage.tsx";

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <CartProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<RootLayout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="products" element={<ProductList/>}/>
                            <Route path="/products/:productId" element={<ProductDetailsPage/>}/>
                            <Route path="cart" element={<CheckoutPage/>}/>
                            <Route path="register" element={<RegisterPage/>}/>
                            <Route path="login" element={<LoginPage/>}/>
                            <Route path="profile" element={<ProfilePage/>}/>
                            <Route path="success" element={<SuccessPage/>}/>
                            <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </CartProvider>
    </StrictMode>
);