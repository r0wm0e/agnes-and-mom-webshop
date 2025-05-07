import React, {useRef, useState} from "react";
import {FaRegUserCircle} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

const UserDropdown: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const {isLoggedIn, logout} = useAuth();

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsHovered(false);
        }, 200);
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button className="relative" aria-label="User options">
                <FaRegUserCircle className="text-2xl"/>
            </button>

            {isHovered && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                    <div className="p-4">
                        {!isLoggedIn ? (
                            <ul className="space-y-2">
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="block text-center text-teal-600 hover:text-teal-500 py-1 rounded transition">
                                        Logga in
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className="block text-center text-teal-600 hover:text-teal-500 py-1 rounded transition">
                                        Registrera
                                    </NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-center text-red-600 hover:text-red-500 py-1 rounded transition">
                                        Logga ut
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
