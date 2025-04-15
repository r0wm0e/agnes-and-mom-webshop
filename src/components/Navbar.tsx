import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
    const { cart } = useCart();

    return (
        <div className="navbar">
            <div className="container">
                <Link to="/">
                    <h1>Logo</h1>
                </Link>
                <ul className="nav-links">
                    <li><NavLink className="nav-link" to="/">Home</NavLink></li>
                    <li><NavLink className="nav-link" to="/products">Products</NavLink></li>
                    <li><NavLink className="nav-link" to="/cart">Cart ({cart.products.length})</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
