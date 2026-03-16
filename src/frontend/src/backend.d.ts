import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type DeliveryAgentId = bigint;
export interface UserProfile {
    name: string;
    address: string;
    phone: string;
}
export type Time = bigint;
export interface Category {
    id: CategoryId;
    name: string;
}
export interface OrderItem {
    productId: ProductId;
    quantity: bigint;
    price: bigint;
}
export type AdVideoId = bigint;
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    paymentMethod: {
        __kind__: "cod";
        cod: null;
    } | {
        __kind__: "upi";
        upi: {
            transactionId: string;
        };
    };
    customerPhone: string;
    createdAt: Time;
    totalAmount: bigint;
    address: string;
    items: Array<OrderItem>;
    deliveryAgent?: DeliveryAgentId;
}
export type CategoryId = bigint;
export type ProductId = bigint;
export interface DeliveryAgent {
    id: DeliveryAgentId;
    name: string;
    phone: string;
}
export interface AdVideo {
    id: AdVideoId;
    title: string;
    active: boolean;
    video: ExternalBlob;
}
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    category: CategoryId;
    image: ExternalBlob;
    price: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    outForDelivery = "outForDelivery",
    delivered = "delivered",
    confirmed = "confirmed",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdVideo(title: string, video: ExternalBlob, active: boolean): Promise<AdVideoId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignOrderToAgent(orderId: OrderId, agentId: DeliveryAgentId): Promise<void>;
    createCategory(name: string): Promise<CategoryId>;
    updateCategory(id: CategoryId, name: string): Promise<void>;
    deleteCategory(id: CategoryId): Promise<void>;
    createDeliveryAgent(name: string, phone: string): Promise<DeliveryAgentId>;
    createProduct(name: string, description: string, price: bigint, category: CategoryId, stock: bigint, image: ExternalBlob): Promise<ProductId>;
    deleteProduct(id: ProductId): Promise<void>;
    getActiveAdVideos(): Promise<Array<AdVideo>>;
    getAdVideos(): Promise<Array<AdVideo>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<Category>>;
    getDeliveryAgents(): Promise<Array<DeliveryAgent>>;
    getOrder(id: OrderId): Promise<Order>;
    getOrdersByPhone(phone: string): Promise<Array<Order>>;
    getProduct(id: ProductId): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, customerPhone: string, address: string, items: Array<OrderItem>, totalAmount: bigint, paymentMethod: {
        __kind__: "cod";
        cod: null;
    } | {
        __kind__: "upi";
        upi: {
            transactionId: string;
        };
    }): Promise<OrderId>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(id: ProductId, name: string, description: string, price: bigint, category: CategoryId, stock: bigint, image: ExternalBlob): Promise<void>;
}
