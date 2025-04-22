import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product.ts';

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Välkommen till Agnes and Mom Webshop!</h1>
                <p className="text-lg text-gray-600">
                    Där kreativiteten flödar och varje poster berättar en egen historia. Inspirerad av en mammas passion för pyssel, konst och det unika, erbjuder vi en kuraterad kollektion av posters som förvandlar ditt hem till ett levande galleri.
                </p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Utforska våra favoriter</h2>
                {loading ? (
                    <p className="text-center">Laddar produkter...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Fel vid hämtning av produkter: {error.message}</p>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 text-center">{product.name}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Inga produkter tillgängliga.</p>
                )}
                <Link to="/products" className="inline-block mt-6 text-blue-500 hover:underline text-center">
                    Se hela kollektionen
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
