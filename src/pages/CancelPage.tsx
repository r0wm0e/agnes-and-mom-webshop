import React, { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';

const CancelPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) {
            setError('Ingen betalningssession hittades i URL.');
            setLoading(false);
            return;
        }

        const cancelOrder = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/stripe/canceled?session_id=${sessionId}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
            } catch {
                setError('Det gick inte att avbryta ordern. Försök igen senare.');
            } finally {
                setLoading(false);
            }
        };

        cancelOrder();
    }, [sessionId]);

    if (loading) {
        return <p className="text-center text-gray-700 dark:text-gray-200">Avbryter din order…</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg text-gray-900 dark:text-gray-100">
            <div className="flex flex-col items-center">
                <FaTimesCircle className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-3xl font-bold text-center mb-2">Betalningen avbröts</h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Din betalning har avbrutits och ordern är markerad som avbruten.
                </p>

                <Link
                    to="/products"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                    Till produktsidan
                </Link>
            </div>
        </div>
    );
};

export default CancelPage;
