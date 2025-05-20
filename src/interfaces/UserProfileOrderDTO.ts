import {UserProfileOrderItemDTO} from "./UserProfileOrderItemDTO.ts";

export interface UserProfileOrderDTO {
    orderId: number;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: UserProfileOrderItemDTO[];
}