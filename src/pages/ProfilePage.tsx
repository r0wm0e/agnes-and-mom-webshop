import React, {useEffect, useState} from 'react';
import {useAuth} from '../context/AuthContext';

interface User {
    id: number;
    username: string;
    enabled: boolean;
    accountNonLocked: boolean;
}

const ProfilePage: React.FC = () => {
    const {isLoggedIn, logout} = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [serverError, setServerError] = useState<string>('');

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

    if (!isLoggedIn) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <p className="text-lg text-white">Du måste vara inloggad för att se din profil.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-slate-800 text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Min profil</h1>

                {serverError && (
                    <div className="mb-4 p-3 bg-red-700 text-red-100 rounded">
                        {serverError}
                    </div>
                )}

                {user ? (
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="font-medium">ID:</span>
                            <span>{user.id}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="font-medium">Email:</span>
                            <span>{user.username}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="font-medium">Enabled:</span>
                            <span className={user.enabled ? 'text-green-400' : 'text-red-400'}>
                {user.enabled ? 'Ja' : 'Nej'}
              </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="font-medium">Locked:</span>
                            <span className={user.accountNonLocked ? 'text-green-400' : 'text-red-400'}>
                {user.accountNonLocked ? 'Nej' : 'Ja'}
              </span>
                        </div>

                        <button onClick={logout}
                                className="w-full mt-6 bg-teal-600 hover:bg-teal-500 text-white py-2 rounded transition">
                            Logga ut
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-400">Laddar användardata…</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
