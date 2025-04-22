import React, { useRef, useState, useEffect } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";

const Dropdown: React.FC = () => {
    const { cart, removeFromCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <button className="relative" aria-label="Open shopping cart">
                <FaShoppingCart />
                {cart.products.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                        {cart.products.length}
                    </div>
                )}
            </button>

            {isHovered && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        {cart.products.length === 0 ? (
                            <p>Varukorgen är tom.</p>
                        ) : (
                            <ul className="space-y-2">
                                {cart.products.map((item) => (
                                    <li
                                        key={item.id}
                                        className="border-b pb-2 flex items-center justify-between gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <div className="text-sm">
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-gray-600">{item.price} SEK</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(cart.id, item.id)} className="text-red-500 hover:text-red-700" aria-label={`${item.name}`}>
                                            <FaTrashAlt />
                                        </button>
                                    </li>
                                ))}
                                <li className="text-sm mt-2 pt-2 border-t">
                                    Total: {cart.totalAmount} SEK
                                </li>
                                <li>
                                    <NavLink
                                        to="/cart" className={({ isActive }) => `block mt-2 text-center bg-teal-600 text-white py-1 rounded hover:bg-teal-500 transition ${isActive ? "font-semibold underline" : ""}`}>
                                        Gå till varukorgen
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
