export type OrderItem = {
    id: string;
    bookid: string;
    bookTitle: string;
    bookAuthor: string;
    coverImageUrl: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
}

export interface OrderResponse {
    id: string;
    orderNumber: string;
    status: "PENDING" | "PROCESSING"|"SHIPPED"|"DELIVERED"|"CANCELLED"|"REFUNDED";
    shippingName: string;
    shippingLine1: string;
    shippingLine2?: string;
    shippingCity: string;
    shippingPostcode: string;
    shippingCountry: string;
    subtotal: number;
    shippingCost: number;
    total: number;
    items: OrderItem[];
    placeAt: string;

}