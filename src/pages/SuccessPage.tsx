import {useEffect, useState} from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import {FaCheckCircle} from 'react-icons/fa';

interface OrderDetailsDto {
    id: number;
    status: string;
    totalAmount: number;
}

const SuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [orderDetails, setOrderDetails] = useState<OrderDetailsDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) {
            setError('Ingen betalningssession hittades i URL.');
            setLoading(false);
            return;
        }

        const fetchOrderDetails = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/stripe/order-details?session_id=${sessionId}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const data: OrderDetailsDto = await res.json();
                setOrderDetails(data);
            } catch {
                setError('Kunde inte hämta orderdetaljer. Prova igen senare.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [sessionId]);

    if (loading) {
        return <p className="text-center text-gray-700 dark:text-gray-200">Hämtar orderdetaljer…</p>;
    }

    if (error) {
        return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;
    }

    return (
        <div
            className="max-w-md mx-auto mt-16 p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg text-gray-900 dark:text-gray-100">
            <div className="flex flex-col items-center">
                <FaCheckCircle className="w-16 h-16 text-green-500 mb-4"/>
                <h1 className="text-3xl font-bold text-center mb-2">Tack för din beställning!</h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Din betalning har genomförts och ordern är bekräftad.
                </p>

                {orderDetails && (
                    <div className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm mb-6">
                        <p className="mb-2">
                            <span className="font-semibold">Ordernummer:</span>{' '}
                            <span className="font-mono">{orderDetails.id}</span>
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Belopp:</span>{' '}
                            <span className="font-mono">{orderDetails.totalAmount.toFixed(2)} SEK</span>
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span>{' '}
                            <span className="capitalize">{orderDetails.status.toLowerCase()}</span>
                        </p>
                    </div>
                )}

                <Link
                    to="/"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                    Till startsidan
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
