import {useEffect, useState} from 'react';
import {useSearchParams, Link} from 'react-router-dom';
import {FaCheckCircle, FaClipboardList, FaHome} from 'react-icons/fa';

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
            className="max-w-xl mx-auto mt-20 p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl text-gray-900 dark:text-gray-100 transition-all">
            <div className="flex flex-col items-center space-y-6">
                <FaCheckCircle className="w-20 h-20 text-green-500"/>
                <h1 className="text-4xl font-extrabold text-center">Tack för din beställning!</h1>
                <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                    Din betalning har genomförts och ordern är bekräftad.
                </p>

                {orderDetails && (
                    <div
                        className="w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-inner text-base space-y-2">
                        <p>
                            <span className="font-semibold">Ordernummer:</span>{' '}
                            <span className="font-mono">{orderDetails.id}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Belopp:</span>{' '}
                            <span className="font-mono">{orderDetails.totalAmount.toFixed(2)} SEK</span>
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span>{' '}
                            <span className="capitalize">{orderDetails.status.toLowerCase()}</span>
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-xl transition duration-200"
                    >
                        <FaClipboardList className="w-4 h-4"/>
                        Se orderhistorik
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-6 rounded-xl transition duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    >
                        <FaHome className="w-4 h-4"/>
                        Till startsidan
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
