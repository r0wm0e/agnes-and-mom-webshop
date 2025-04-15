import {Product} from "./Product.ts";

export interface Cart {
    id: number;
    products: Product[];
    totalAmount: number;
}