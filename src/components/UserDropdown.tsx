import React, {useRef, useState} from "react";
import {FaChevronUp, FaRegUserCircle, FaSignInAlt, FaSignOutAlt, FaUserPlus} from "react-icons/fa";
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
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="relative text-white hover:text-teal-300 transition" aria-label="User options">
                <FaRegUserCircle className="text-2xl"/>
            </button>

            {isHovered && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-2xl shadow-xl border z-50">
                    <div className="flex justify-end -mt-2 mr-4">
                        <FaChevronUp className="text-white bg-white rounded-full p-1 shadow"/>
                    </div>

                    <div className="px-5 py-4">
                        {!isLoggedIn ? (
                            <ul className="space-y-3">
                                <li>
                                    <NavLink to="/login"
                                             className="flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-500 transition">
                                        <FaSignInAlt/> Logga in
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register"
                                             className="flex items-center justify-center gap-2 bg-gray-100 text-teal-600 py-2 rounded-xl hover:bg-gray-200 transition">
                                        <FaUserPlus/> Registrera
                                    </NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="space-y-3">
                                <li>
                                    <NavLink to="/profile"
                                             className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition">
                                        <FaRegUserCircle/>Min profil
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={logout}
                                            className="flex items-center justify-center gap-2 w-full bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-200 transition">
                                        <FaSignOutAlt/>Logga ut
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
