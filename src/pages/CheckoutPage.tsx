import React from 'react';
import {useCart} from '../context/CartContext';
import {fetchWithAuth} from "../utils/fetWithAuth.ts";
import {isLoggedIn} from "../utils/Auth.ts";
import {NavLink} from "react-router-dom";

const CheckoutPage: React.FC = () => {
    const {cart, loading, error, removeFromCart} = useCart();
    const loggedIn = isLoggedIn();

    const handleCheckout = async () => {
        try {
            const response = await fetchWithAuth(`http://localhost:8080/api/stripe/create-checkout-session/cart/${cart.id}`, {
                method: 'POST',
            });

            const sessionUrl = await response.text();

            if (response.ok) {
                window.location.href = sessionUrl;
            } else {
                alert(sessionUrl);
            }
        } catch (err) {
            console.error("Checkout failed", err);
            alert("You need to login to buy a product.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Din varukorg</h1>
            {cart.items.length === 0 ? (
                <p>Varukorgen är tom.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.items.map((item) => (
                            <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                                <img src={item.product.imageUrl} alt={item.product.name}
                                     className="w-20 h-20 object-cover rounded"/>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                    <p>Pris: {item.product.price} SEK</p>
                                    <p>Antal: {item.quantity}</p>
                                </div>
                                <button className="text-red-600 hover:text-red-800 font-medium"
                                        onClick={() => removeFromCart(item.product.id)}>
                                    Ta bort
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 text-lg font-semibold">
                        Total: {totalPrice.toFixed(2)} SEK
                    </div>

                    {loggedIn ? (
                        <button onClick={handleCheckout}
                                className="mt-6 w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded transition">
                            Gå till kassan
                        </button>
                    ) : (
                        <div className="mt-6 space-y-3 text-center">
                            <p className="text-red-600 font-medium">Du måste vara inloggad för att köpa.</p>
                            <div className="flex justify-center gap-3">
                                <NavLink to="/login"
                                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded font-semibold transition">
                                    Logga in
                                </NavLink>
                                <NavLink to="/register"
                                    className="px-4 py-2 border border-teal-600 hover:bg-teal-50 text-teal-600 rounded font-semibold transition">
                                    Registrera
                                </NavLink>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CheckoutPage;
