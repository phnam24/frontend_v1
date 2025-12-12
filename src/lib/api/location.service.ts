import axios from "axios";
import type { Province, District, Ward, LocationResponse, LocationParams } from "@/types/address";

const LOCATION_API_BASE = "https://tinhthanhpho.com/api/v1";

// Create separate axios instance for location API (no auth needed)
const locationClient = axios.create({
    baseURL: LOCATION_API_BASE,
    timeout: 10000,
});

/**
 * Get all provinces in Vietnam
 */
export async function getProvinces(params?: LocationParams): Promise<LocationResponse<Province>> {
    const response = await locationClient.get<LocationResponse<Province>>("/provinces", { params });
    return response.data;
}

/**
 * Get districts by province code
 */
export async function getDistrictsByProvince(
    provinceCode: string,
    params?: LocationParams
): Promise<LocationResponse<District>> {
    const response = await locationClient.get<LocationResponse<District>>(
        `/provinces/${provinceCode}/districts`,
        { params }
    );
    return response.data;
}

/**
 * Get wards by district code
 */
export async function getWardsByDistrict(
    districtCode: string,
    params?: LocationParams
): Promise<LocationResponse<Ward>> {
    const response = await locationClient.get<LocationResponse<Ward>>(
        `/districts/${districtCode}/wards`,
        { params }
    );
    return response.data;
}
