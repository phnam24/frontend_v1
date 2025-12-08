import apiClient from "./client";
import type {
    ApiResponse,
    PaginatedResponse,
    Order,
    CreateOrderRequest,
    Voucher,
    OrderStatus,
    PaymentStatus
} from "@/types";

// Orders
export async function createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(
        "/orders",
        data
    );
    return response.data.result;
}

export async function getOrderById(id: number): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.result;
}

export async function getMyOrders(params?: {
    page?: number;
    limit?: number;
}): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        "/orders/my-orders",
        { params }
    );
    return response.data.result;
}

export async function cancelOrder(id: number): Promise<Order> {
    const response = await apiClient.put<ApiResponse<Order>>(
        `/orders/${id}/cancel`
    );
    return response.data.result;
}

// Admin only
export async function getAllOrders(params?: {
    page?: number;
    limit?: number;
}): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        "/orders",
        { params }
    );
    return response.data.result;
}

export async function getOrdersByStatus(
    status: OrderStatus,
    params?: {
        page?: number;
        limit?: number;
    }
): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        `/orders/status/${status}`,
        { params }
    );
    return response.data.result;
}

export async function updateOrderStatus(
    id: number,
    status: OrderStatus
): Promise<Order> {
    const response = await apiClient.put<ApiResponse<Order>>(
        `/orders/${id}/status`,
        null,
        { params: { status } }
    );
    return response.data.result;
}

export async function updatePaymentStatus(
    id: number,
    status: PaymentStatus
): Promise<Order> {
    const response = await apiClient.put<ApiResponse<Order>>(
        `/orders/${id}/payment-status`,
        null,
        { params: { status } }
    );
    return response.data.result;
}

// Vouchers
export async function getVoucherByCode(code: string): Promise<Voucher> {
    const response = await apiClient.get<ApiResponse<Voucher>>(
        `/vouchers/code/${code}`
    );
    return response.data.result;
}

export async function getActiveVouchers(params?: {
    page?: number;
    limit?: number;
}): Promise<PaginatedResponse<Voucher>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Voucher>>>(
        "/vouchers/active",
        { params }
    );
    return response.data.result;
}
