"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/lib/store/cart.store";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api/product.service";
import { generateProductSlug } from "@/lib/utils/slug";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { updateItem, removeItem, isLoading } = useCartStore();

    // Fetch product details
    const { data: product } = useQuery({
        queryKey: ["product", item.productId],
        queryFn: () => getProductById(item.productId),
        enabled: !!item.productId,
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "đ";
    };

    const handleQuantityChange = async (newQuantity: number) => {
        await updateItem(item.id, newQuantity);
    };

    const handleRemove = async () => {
        await removeItem(item.id);
        setShowDeleteDialog(false);
    };

    const productImage = product?.avatar || product?.firstImage || "/placeholder-product.png";
    const productName = product?.name || "Đang tải...";
    const productSlug = product ? generateProductSlug(product.slug, product.id) : "#";

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
                {/* Product Image */}
                <Link href={`/products/${productSlug}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={productImage}
                            alt={productName}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <Link href={`/products/${productSlug}`} className="block">
                        <h3 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2">
                            {productName}
                        </h3>
                    </Link>

                    {item.attributesName && (
                        <p className="text-sm text-gray-600 mt-1">
                            Phân loại: {item.attributesName}
                        </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-semibold text-primary">
                            {formatPrice(item.priceSnapshot || 0)}
                        </span>

                        <div className="flex items-center gap-3">
                            <QuantitySelector
                                value={item.quantity}
                                onChange={handleQuantityChange}
                                min={1}
                                max={99}
                                disabled={isLoading}
                                size="sm"
                            />

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDeleteDialog(true)}
                                disabled={isLoading}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Delete Confirmation */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa sản phẩm</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRemove}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
