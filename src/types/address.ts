export interface Address {
    id: number;
    userId: string;
    receiverName: string;
    phone: string;
    addressLine: string;
    province: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

export interface CreateAddressRequest {
    receiverName: string;
    phone: string;
    addressLine: string;
    province: string;
    district: string;
    ward: string;
    isDefault?: boolean;
}

export interface UpdateAddressRequest {
    receiverName?: string;
    phone?: string;
    addressLine?: string;
    province?: string;
    district?: string;
    ward?: string;
    isDefault?: boolean;
}

// Vietnam Location Types
export interface Province {
    code: string;
    name: string;
    type: string;
}

export interface District {
    code: string;
    name: string;
    type: string;
    province_code: string;
}

export interface Ward {
    code: string;
    name: string;
    type: string;
    district_code: string;
    province_code: string;
}

export interface LocationResponse<T> {
    success: boolean;
    data: T[];
    metadata: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface LocationParams {
    keyword?: string;
    limit?: number;
    page?: number;
}
