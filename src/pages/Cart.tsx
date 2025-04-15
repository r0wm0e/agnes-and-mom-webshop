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
        <div className="cart-container">
            <h1 className="page-title">Your Cart</h1>
            {cart.products.length === 0 ? (
                <p className="center-text">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.products.map((product) => (
                            <li key={product.id} className="cart-item">
                                <div>
                                    <h2>{product.name}</h2>
                                    <p>Price: {product.price} SEK</p>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(cartId, product.id)}
                                >
                                    Remove
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
