"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
    discount?: number;
    total: number;
    itemCount: number;
    onCheckout?: () => void;
    isLoading?: boolean;
}

export function CartSummary({
    subtotal,
    discount = 0,
    total,
    itemCount,
    onCheckout,
    isLoading = false,
}: CartSummaryProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính ({itemCount} sản phẩm)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Giảm giá</span>
                        <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
                    </div>
                )}

                <div className="border-t pt-3">
                    <div className="flex justify-between">
                        <span className="font-semibold text-base">Tổng cộng</span>
                        <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
                    </div>
                </div>
            </div>

            {onCheckout ? (
                <Button
                    onClick={onCheckout}
                    disabled={isLoading || itemCount === 0}
                    className="w-full gap-2 h-12 text-base"
                    size="lg"
                >
                    <ShoppingCart className="h-5 w-5" />
                    {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
                </Button>
            ) : (
                <Button asChild className="w-full gap-2 h-12 text-base" size="lg" disabled={itemCount === 0}>
                    <Link href="/checkout">
                        <ShoppingCart className="h-5 w-5" />
                        Tiến hành thanh toán
                    </Link>
                </Button>
            )}

            <p className="text-xs text-gray-500 text-center mt-4">
                Phí vận chuyển sẽ được tính ở bước thanh toán
            </p>
        </div>
    );
}
