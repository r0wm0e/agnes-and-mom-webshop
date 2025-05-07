import {useEffect, useState} from 'react';
import {useCart} from "../context/CartContext";
import {Product} from "../interfaces/Product";
import AddToCartButton from "../components/AddToCartButton.tsx";
import {Link} from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const {addToCart} = useCart();

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
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-center mb-8">Product List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <li key={product.id} className="bg-white shadow-md rounded-lg p-4">
                        <Link to={`/products/${product.id}`} key={product.id}
                              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
                            <img src={product.imageUrl}
                                 alt={product.name}
                                 className="w-full h-48 object-cover rounded-md mb-4"/>

                            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                        </Link>

                        <div className="space-y-4">
                            <p className="text-lg text-gray-600">{product.description}</p>
                            <p className="text-xl font-semibold text-teal-600">{product.price} SEK</p>
                            <AddToCartButton onClick={() => addToCart(product.id, 1)} stock={product.stock}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
