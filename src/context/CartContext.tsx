import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {Cart} from "../interfaces/Cart";

interface CartContextType {
    cart: Cart;
    loading: boolean;
    error: string | null;
    addToCart: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const savedCartId = localStorage.getItem("cartId");

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

export const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<Cart>({
        id: 0,
        items: [],
        totalAmount: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (!savedCartId) {
                const res = await fetch("http://localhost:8080/api/cart/create", {method: "POST"});
                const newCart: Cart = await res.json();
                setCart(newCart);
                localStorage.setItem("cartId", newCart.id.toString());
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/cart/${savedCartId}`);
                if (!response.ok) throw new Error("Could not fetch cart from server");
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

    const addToCart = async (productId: number, quantity: number) => {
        const cartId = cart.id;
        console.log("Adding product to cart with cartId:", cartId, "and productId:", productId, "and quantity:", quantity);

        if (!cartId || !productId) {
            console.error("CheckoutPage ID or Product ID is missing");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/cart/${cartId}/add?productId=${productId}&quantity=${quantity}`, {
                method: "POST"
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

    const removeFromCart = async (productId: number) => {
        const cartId = cart.id;
        try {
            const response = await fetch(`http://localhost:8080/api/cart/${cartId}/remove?productId=${productId}`, {
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

    const updateQuantity = async (productId: number, newQuantity: number) => {
        if (newQuantity < 0) {
            console.error("Quantity must be greater than 0");
            return;
        }

        if (!savedCartId) {
            console.error("CheckoutPage not found in localStorage");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/cart/${savedCartId}/update?productId=${productId}&quantity=${newQuantity}`,
                {
                    method: "PUT",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update quantity in cart");
            }

            const updatedCart: Cart = await response.json();
            setCart(updatedCart);
        } catch (error: any) {
            console.error("Error updating quantity:", error);
            setError(error.message);
        }
    };

    const value: CartContextType = {
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
