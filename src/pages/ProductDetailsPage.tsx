import {useEffect, useState} from "react";
import {Product} from "../interfaces/Product.ts";
import {useParams} from "react-router-dom";
import {useCart} from "../context/CartContext.tsx";
import AddToCartButton from "../components/AddToCartButton.tsx";

const ProductDetailsPage: React.FC = () => {

    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error instanceof Error ? error : new Error("Unknown error"));
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <p>Laddar...</p>;
    if (error) return <p>Fel: {error.message}</p>;
    if (!product) return <p>Ingen produkt hittades.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/400x400'}
                        alt={product.name}
                        className="w-full max-w-sm h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="space-y-4">
                    <p className="text-lg text-gray-600">{product.description}</p>
                    <p className="text-xl font-semibold text-teal-600">{product.price} SEK</p>
                    <AddToCartButton onClick={() => {
                            console.log('Knapp klickad');
                            addToCart(product.id, 1);
                        }}
                        stock={product.stock}
                    />
                </div>
            </div>
        </div>
    );
};


export default ProductDetailsPage;
