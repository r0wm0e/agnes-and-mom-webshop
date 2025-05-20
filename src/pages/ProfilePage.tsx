import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserProfileOrderDTO } from "../interfaces/UserProfileOrderDTO";
import { FaSignOutAlt, FaShoppingCart, FaUser, FaLock, FaLockOpen, FaCheck, FaTimes } from 'react-icons/fa';

interface User {
    id: number;
    username: string;
    enabled: boolean;
    accountNonLocked: boolean;
}

const ProfilePage: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [serverError, setServerError] = useState<string>('');
    const [orders, setOrders] = useState<UserProfileOrderDTO[]>([]);

    useEffect(() => {
        if (!isLoggedIn) return;

        fetch("http://localhost:8080/api/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(async res => {
                if (!res.ok) {
                    const msg = await res.text();
                    throw new Error(msg || res.statusText);
                }
                return res.json();
            })
            .then(userData => setUser(userData))
            .catch(err => setServerError(err.message));
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;

        fetch("http://localhost:8080/api/orders/all", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(orderData => setOrders(orderData))
            .catch(err => setServerError(err.message));
    }, [isLoggedIn]);

    const getOrderStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'text-yellow-500';
            case 'PAID':
                return 'text-green-500';
            case 'CANCELLED':
                return 'text-red-500';
            default:
                return 'text-gray-400';
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <p className="text-lg text-white">Du måste vara inloggad för att se dina ordrar.</p>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <div className="container mx-auto max-w-4xl px-6 py-10 bg-gray-900 text-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                    <FaUser className="w-8 h-8 text-teal-400" /> Min Profil
                </h1>

                {serverError && (
                    <div className="mb-4 p-4 bg-red-700 text-red-100 rounded-lg">
                        {serverError}
                    </div>
                )}

                {user ? (
                    <div className="space-y-10">
                        <div className="bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold mb-4">Användarinformation</h2>
                            <div className="space-y-3 text-base">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Användarnamn:</span>
                                    <span>{user.username}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Aktiverat:</span>
                                    <span className="flex items-center gap-2">
                                        {user.enabled ? (
                                            <>
                                                <FaCheck className="text-green-400" /> Ja
                                            </>
                                        ) : (
                                            <>
                                                <FaTimes className="text-red-400" /> Nej
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Kontostatus:</span>
                                    <span className="flex items-center gap-2">
                                        {user.accountNonLocked ? (
                                            <>
                                                <FaLockOpen className="text-green-400" /> Inte låst
                                            </>
                                        ) : (
                                            <>
                                                <FaLock className="text-red-400" /> Låst
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                <FaShoppingCart className="w-6 h-6 text-teal-400" />
                                Tidigare köp
                            </h2>
                            {orders.length === 0 ? (
                                <p className="text-gray-400">Du har inte gjort några köp ännu.</p>
                            ) : (
                                orders.map(order => (
                                    <div key={order.orderId} className="mb-6 p-5 bg-gray-800 rounded-lg shadow-md">
                                        <div className="text-sm text-gray-400 mb-2">
                                            Order #{order.orderId} • {new Date(order.createdAt).toLocaleString()} • <span className={getOrderStatusClass(order.status)}>{order.status}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={`${order.orderId}-${idx}`} className="flex items-center space-x-4">
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.productName}
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-medium text-white">{item.productName}</div>
                                                        <div className="text-gray-300">
                                                            Antal: {item.quantity} • Pris: {item.priceAtPurchase.toFixed(2)} kr
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3 text-right text-lg font-bold text-white">
                                            Totalt: {order.totalAmount.toFixed(2)} kr
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="text-center pt-6 border-t border-gray-700">
                            <button
                                onClick={logout}
                                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg transition text-lg font-medium"
                            >
                                <FaSignOutAlt className="w-5 h-5" /> Logga ut
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">Laddar användardata…</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
