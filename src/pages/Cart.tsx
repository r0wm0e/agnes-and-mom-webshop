import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cart, loading, error, removeFromCart } = useCart();
    const cartId = 1;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const totalPrice = cart.products.reduce((total, product) => total + product.price, 0);

    return (
        <div className="cart-container max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Din varukorg</h1>
            {cart.products.length === 0 ? (
                <p className="center-text">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-list space-y-4">
                        {cart.products.map((product) => (
                            <li key={product.id} className="cart-item flex items-center gap-4 border-b pb-4">
                                <img src={product.imageUrl || "https://via.placeholder.com/80"}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded"/>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">{product.name}</h2>
                                    <p className="text-gray-600">Pris: {product.price} SEK</p>
                                </div>
                                <button
                                    className="text-red-600 hover:text-red-800 font-medium"
                                    onClick={() => removeFromCart(cartId, product.id)}
                                >
                                    Ta bort
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="cart-summary">
                        Total: {totalPrice.toFixed(2)} SEK
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
