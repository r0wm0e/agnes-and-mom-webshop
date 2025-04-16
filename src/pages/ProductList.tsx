import { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";
import { Product } from "../interfaces/Product";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('Unknown error'));
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="product-list-container">
            <h1 className="page-title">Product List</h1>
            <ul className="products-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <p className="price">{product.price} SEK</p>
                        <button onClick={() => {
                            console.log("Adding to cart, productId:", product.id);
                            addToCart(1, product.id);
                        }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
