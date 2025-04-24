import React, {useRef, useState} from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import {CartItem} from "../interfaces/CartItem.ts";

const Dropdown: React.FC = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [isHovered, setIsHovered] = useState(false);
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

    const isCartEmpty = !cart?.items?.length;

    return (
        <div className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <button className="relative" aria-label="Open shopping cart">
                <FaShoppingCart />
                {cart?.items?.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                        {cart.items.reduce((sum: number, item: CartItem): number => sum + item.quantity, 0)}
                    </div>
                )}
            </button>

            {isHovered && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        {isCartEmpty ? (
                            <p>Varukorgen är tom.</p>
                        ) : (
                            <ul className="space-y-2">
                                {cart.items.map((item) => (
                                    <li key={item.id} className="border-b pb-2 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <img src={item.product.imageUrl}
                                                alt={item.product.name} className="w-10 h-10 object-cover rounded"/>

                                            <div className="text-sm">
                                                <div className="font-medium">{item.product.name}</div>
                                                <div className="text-gray-600">
                                                    {item.product.price} SEK x {item.quantity}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="px-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                                aria-label="Minska antal">
                                                −
                                            </button>
                                            <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="px-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                                    aria-label="Öka antal">
                                                +
                                            </button>
                                            <button onClick={() => removeFromCart(item.product.id)}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                    aria-label="Ta bort produkt">
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                                <li className="text-sm mt-2 pt-2 border-t">
                                    Total: {cart.totalAmount} SEK
                                </li>
                                <li>
                                    <NavLink to="/cart" className={({ isActive }) => `block mt-2 text-center bg-teal-600 text-white py-1 rounded hover:bg-teal-500 transition 
                                    ${isActive ? "font-semibold underline" : ""}`}>
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
