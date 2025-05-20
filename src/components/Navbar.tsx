import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {FaChildren} from "react-icons/fa6";
import DropdownCart from "./DropdownCart.tsx";
import UserDropdown from "./UserDropdown.tsx";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-slate-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold hover:text-teal-400 transition">
                    <FaChildren/>
                </Link>

                <ul className="flex items-center space-x-6">
                    <li>
                        <NavLink to="/" className={({isActive}) =>
                            `hover:text-teal-400 transition ${isActive ? "font-semibold underline" : ""}`}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({isActive}) =>
                            `hover:text-teal-400 transition ${isActive ? "font-semibold underline" : ""}`}>
                            Products
                        </NavLink>
                    </li>

                    <li className="relative">
                        <DropdownCart/>
                    </li>
                    <li className="relative">
                        <UserDropdown/>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
