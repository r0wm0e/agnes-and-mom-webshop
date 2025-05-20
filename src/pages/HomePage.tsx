import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Product} from '../interfaces/Product.ts';
import {HiArrowRight} from "react-icons/hi";

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
                <h1 className="text-4xl font-bold mb-4">Välkommen till Agnes and Mom Webshop!</h1>
                <p className="text-lg">
                    Välkommen till Agnes and Mom – en webshop fylld med handplockade posters skapade med kärlek och kreativitet.
                    Här hittar du konst som passar alla rum, från barnkammaren till vardagsrummet. Ge dina väggar liv med design
                    som betyder något.
                </p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold text-white text-center mb-8">Utforska våra favoriter</h2>
                {loading ? (
                    <p className="text-center">Laddar produkter...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Fel vid hämtning av produkter: {error.message}</p>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 text-center">{product.name}</h3>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Inga produkter tillgängliga.</p>
                )}
                <div className="text-center mt-6">
                    <Link to="/products" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-md
                    hover:bg-teal-500 transition text-sm font-medium">
                        Se hela kollektionen
                        <HiArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
