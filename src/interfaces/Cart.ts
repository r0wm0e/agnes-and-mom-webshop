import { CartItem } from "./CartItem";

export interface Cart {
    id: number;
    items: CartItem[];
    totalAmount: number;
}