"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, ShoppingBag, Tag } from "lucide-react";
import type { CartItem } from "@/types";

interface OrderSummaryProps {
    selectedItems: CartItem[];
}

export function OrderSummary({ selectedItems }: OrderSummaryProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    };

    const shippingFee = 30000;
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.priceSnapshot * item.quantity), 0);
    const total = subtotal + shippingFee;

    return (
        <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm sticky top-24">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    Đơn hàng của bạn
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {selectedItems.length} sản phẩm
                </p>
            </div>

            {/* Cart Items */}
            <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
                {selectedItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                                {item.quantity}
                            </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2 text-gray-900">
                                Sản phẩm #{item.productId}
                            </p>
                            {item.attributesName && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {item.attributesName}
                                </p>
                            )}
                            <p className="text-sm font-semibold text-primary mt-1">
                                {formatPrice(item.priceSnapshot * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm items-center">
                    <div className="flex items-center gap-1.5">
                        <Truck className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">Phí vận chuyển</span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatPrice(shippingFee)}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-semibold text-gray-900">Tổng cộng</span>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{formatPrice(total)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">(Đã bao gồm VAT)</p>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-blue-50 border-t border-blue-200">
                <p className="text-xs text-blue-700 flex items-start gap-2">
                    <ShoppingBag className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>
                        Đơn hàng sẽ được xác nhận sau khi bạn hoàn tất thanh toán
                    </span>
                </p>
            </div>
        </div>
    );
}
