"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Save, X, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { LocationSelect } from "@/components/ui/LocationSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getProvinces, getDistrictsByProvince, getWardsByDistrict } from "@/lib/api/location.service";
import { createAddress, updateAddress } from "@/lib/api/address.service";
import { formatProvinces, formatDistricts, formatWards } from "@/lib/utils/location";
import type { Address, Province, District, Ward } from "@/types/address";
import toast from "react-hot-toast";

const addressSchema = z.object({
    receiverName: z.string().min(2, "Tên người nhận phải có ít nhất 2 ký tự"),
    phone: z.string().regex(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
    addressLine: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
    province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
    district: z.string().min(1, "Vui lòng chọn quận/huyện"),
    ward: z.string().min(1, "Vui lòng chọn phường/xã"),
    isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
    address?: Address;
    onSuccess: () => void;
    onCancel: () => void;
}

export function AddressForm({ address, onSuccess, onCancel }: AddressFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("");
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            receiverName: address?.receiverName || "",
            phone: address?.phone || "",
            addressLine: address?.addressLine || "",
            province: address?.province || "",
            district: address?.district || "",
            ward: address?.ward || "",
            isDefault: address?.isDefault || false,
        },
    });

    // Watch form values
    const province = watch("province");
    const district = watch("district");
    const ward = watch("ward");
    const isDefault = watch("isDefault");

    // Fetch provinces
    const { data: provincesData, isLoading: loadingProvinces } = useQuery({
        queryKey: ["provinces"],
        queryFn: async () => {
            const data = await getProvinces({ limit: 100 });
            return { ...data, data: formatProvinces(data.data) };
        },
    });

    // Fetch districts when province changes
    const { data: districtsData, isLoading: loadingDistricts } = useQuery({
        queryKey: ["districts", selectedProvinceCode],
        queryFn: async () => {
            const data = await getDistrictsByProvince(selectedProvinceCode, { limit: 100 });
            return { ...data, data: formatDistricts(data.data) };
        },
        enabled: !!selectedProvinceCode,
    });

    // Fetch wards when district changes
    const { data: wardsData, isLoading: loadingWards } = useQuery({
        queryKey: ["wards", selectedDistrictCode],
        queryFn: async () => {
            const data = await getWardsByDistrict(selectedDistrictCode, { limit: 100 });
            return { ...data, data: formatWards(data.data) };
        },
        enabled: !!selectedDistrictCode,
    });

    // Initialize province code from existing address
    useEffect(() => {
        if (address && provincesData) {
            const provinceObj = provincesData.data.find(p => p.name === address.province);
            if (provinceObj) {
                setSelectedProvinceCode(provinceObj.code);
            }
        }
    }, [address, provincesData]);

    // Initialize district code from existing address
    useEffect(() => {
        if (address && districtsData) {
            const districtObj = districtsData.data.find(d => d.name === address.district);
            if (districtObj) {
                setSelectedDistrictCode(districtObj.code);
            }
        }
    }, [address, districtsData]);

    const handleProvinceChange = (value: string, option: Province) => {
        setValue("province", value);
        setSelectedProvinceCode(option.code);
        // Clear dependent fields
        setValue("district", "");
        setValue("ward", "");
        setSelectedDistrictCode("");
    };

    const handleDistrictChange = (value: string, option: District) => {
        setValue("district", value);
        setSelectedDistrictCode(option.code);
        // Clear dependent field
        setValue("ward", "");
    };

    const handleWardChange = (value: string, option: Ward) => {
        setValue("ward", value);
    };

    const onSubmit = async (data: AddressFormData) => {
        setIsSubmitting(true);
        try {
            if (address) {
                await updateAddress(address.id, data);
                toast.success("Cập nhật địa chỉ thành công!");
            } else {
                await createAddress(data);
                toast.success("Thêm địa chỉ thành công!");
            }
            onSuccess();
        } catch (error: any) {
            console.error("Address form error:", error);
            toast.error(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Receiver Name */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <FloatingLabelInput
                    {...register("receiverName")}
                    label="Tên người nhận"
                    type="text"
                    error={errors.receiverName?.message}
                    value={watch("receiverName")}
                />
            </motion.div>

            {/* Phone */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <FloatingLabelInput
                    {...register("phone")}
                    label="Số điện thoại"
                    type="tel"
                    error={errors.phone?.message}
                    value={watch("phone")}
                />
            </motion.div>

            {/* Province */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <LocationSelect
                    label="Tỉnh/Thành phố"
                    value={province}
                    onChange={handleProvinceChange}
                    options={provincesData?.data || []}
                    isLoading={loadingProvinces}
                    error={errors.province?.message}
                    placeholder="Chọn tỉnh/thành phố"
                />
            </motion.div>

            {/* District */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <LocationSelect
                    label="Quận/Huyện"
                    value={district}
                    onChange={handleDistrictChange}
                    options={districtsData?.data || []}
                    isLoading={loadingDistricts}
                    disabled={!selectedProvinceCode}
                    error={errors.district?.message}
                    placeholder="Chọn quận/huyện"
                />
            </motion.div>

            {/* Ward */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <LocationSelect
                    label="Phường/Xã"
                    value={ward}
                    onChange={handleWardChange}
                    options={wardsData?.data || []}
                    isLoading={loadingWards}
                    disabled={!selectedDistrictCode}
                    error={errors.ward?.message}
                    placeholder="Chọn phường/xã"
                />
            </motion.div>

            {/* Address Line */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
            >
                <FloatingLabelInput
                    {...register("addressLine")}
                    label="Địa chỉ cụ thể"
                    type="text"
                    error={errors.addressLine?.message}
                    value={watch("addressLine")}
                    placeholder="Số nhà, tên đường..."
                />
            </motion.div>

            {/* Default Checkbox */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
            >
                <Checkbox
                    id="isDefault"
                    checked={isDefault}
                    onCheckedChange={(checked) => setValue("isDefault", checked as boolean)}
                />
                <label
                    htmlFor="isDefault"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                    Đặt làm địa chỉ mặc định
                </label>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex gap-3 justify-end pt-4 border-t"
            >
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="gap-2"
                >
                    <X className="h-4 w-4" />
                    Hủy
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Đang lưu...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            {address ? "Cập nhật" : "Thêm địa chỉ"}
                        </>
                    )}
                </Button>
            </motion.div>
        </form>
    );
}
