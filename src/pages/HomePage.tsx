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
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Välkommen till Agnes and Mom Webshop!</h1>
                <p>
                    Där kreativiteten flödar och varje poster berättar en egen historia. Inspirerad av en mammas passion för pyssel, konst och det unika, erbjuder vi en kuraterad kollektion av posters som förvandlar ditt hem till ett levande galleri.
                </p>
            </header>

            <section className="product-preview">
                <h2>Utforska våra favoriter</h2>
                {loading ? (
                    <p>Laddar produkter...</p>
                ) : error ? (
                    <p>Fel vid hämtning av produkter: {error.message}</p>
                ) : products.length > 0 ? (
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h3>{product.name}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Inga produkter tillgängliga.</p>
                )}
                <Link to="/products" className="view-all">
                    Se hela kollektionen
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
