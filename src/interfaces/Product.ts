import {Category} from "./Category.ts";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: Category;
}