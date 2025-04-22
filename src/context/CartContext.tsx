import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart } from "../interfaces/Cart";

interface CartContextType {
    cart: Cart;
    loading: boolean;
    error: string | null;
    addToCart: (cartId: number, productId: number) => void;
    removeFromCart: (cartId: number, productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<Cart>({
        id: 0,
        products: [],
        totalAmount: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/carts/1");
                if (!response.ok) {
                    throw new Error("Could not fetch cart from server");
                }
                const data: Cart = await response.json();
                setCart(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {
        const totalAmount = cart.products.reduce(
            (total, product) => total + product.price, 0
        );
        setCart((prevCart) => ({
            ...prevCart,
            totalAmount,
        }));
    }, [cart.products]);

    const addToCart = async (cartId: number, productId: number) => {
        console.log("Adding product to cart with cartId:", cartId, "and productId:", productId);

        if (!cartId || !productId) {
            console.error("Cart ID or Product ID is missing");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}/add-product/${productId}`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }

            const updatedCart: Cart = await response.json();
            console.log("Updated cart:", updatedCart);
            setCart(updatedCart);
        } catch (error: any) {
            console.error("Error adding product to cart:", error);
        }
    };

    const removeFromCart = async (cartId: number, productId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}/remove-product/${productId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Could not update cart on the server");
            }
            const updatedCart: Cart = await response.json();
            setCart(updatedCart);
        } catch (err: any) {
            console.error("Error removing product from cart:", err);
            setError(err.message);
        }
    };

    const value: CartContextType = {
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
