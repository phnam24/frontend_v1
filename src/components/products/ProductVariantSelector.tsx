"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Package, AlertCircle, Cpu, HardDrive, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types";

interface ProductVariantSelectorProps {
    variants: ProductVariant[];
    selectedVariantId?: number;
    onVariantChange: (variant: ProductVariant) => void;
}

export function ProductVariantSelector({
    variants,
    selectedVariantId,
    onVariantChange,
}: ProductVariantSelectorProps) {
    // Auto-select first variant if none selected
    useEffect(() => {
        if (!selectedVariantId && variants.length > 0) {
            onVariantChange(variants[0]);
        }
    }, [variants, selectedVariantId, onVariantChange]);

    // Format storage for display
    const formatStorage = (gb: number): string => {
        if (gb >= 1000) {
            return `${gb / 1000}TB`;
        }
        return `${gb}GB`;
    };

    // Format price
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    };

    if (variants.length === 0) {
        return null;
    }

    // If only one variant, don't show selector
    if (variants.length === 1) {
        const variant = variants[0];
        return (
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>
                        {variant.stock > 0
                            ? `Còn ${variant.stock} sản phẩm`
                            : "Hết hàng"}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Chọn phiên bản</h3>
            <div className="grid grid-cols-1 gap-3">
                {variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    const isOutOfStock = variant.stock === 0;

                    return (
                        <motion.button
                            key={variant.id}
                            onClick={() => !isOutOfStock && onVariantChange(variant)}
                            disabled={isOutOfStock}
                            className={cn(
                                "relative w-full p-4 rounded-xl border-2 text-left transition-all",
                                isSelected
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",
                                isOutOfStock && "opacity-50 cursor-not-allowed bg-gray-50"
                            )}
                            whileHover={!isOutOfStock ? { scale: 1.01 } : {}}
                            whileTap={!isOutOfStock ? { scale: 0.99 } : {}}
                        >
                            {/* Selected Check Mark */}
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-3 right-3 bg-primary rounded-full p-1"
                                >
                                    <Check className="h-3 w-3 text-white" />
                                </motion.div>
                            )}

                            {/* Variant Info */}
                            <div className="space-y-2">
                                {/* Specs Row */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Color Badge */}
                                    {variant.color && (
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                                            <Palette className="h-3 w-3" />
                                            {variant.color}
                                        </div>
                                    )}

                                    {/* RAM Badge */}
                                    {variant.ramGb && (
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700">
                                            <Cpu className="h-3 w-3" />
                                            {variant.ramGb}GB RAM
                                        </div>
                                    )}

                                    {/* Storage Badge */}
                                    {variant.storageGb && (
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-xs font-medium text-orange-700">
                                            <HardDrive className="h-3 w-3" />
                                            {formatStorage(variant.storageGb)} SSD
                                        </div>
                                    )}
                                </div>

                                {/* Price & Stock Row */}
                                <div className="flex items-center justify-between pt-1">
                                    {/* Price */}
                                    <div className="flex items-baseline gap-2">
                                        <span className={cn(
                                            "text-base font-bold",
                                            isSelected ? "text-primary" : "text-gray-900"
                                        )}>
                                            {formatPrice(variant.priceSale)}
                                        </span>
                                        {variant.priceSale < variant.priceList && (
                                            <span className="text-xs text-gray-400 line-through">
                                                {formatPrice(variant.priceList)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Stock Info */}
                                    <div className={cn(
                                        "flex items-center gap-1 text-xs",
                                        variant.stock > 10
                                            ? "text-green-600"
                                            : variant.stock > 0
                                                ? "text-yellow-600"
                                                : "text-red-600"
                                    )}>
                                        {variant.stock > 0 ? (
                                            <>
                                                <Package className="h-3 w-3" />
                                                <span>
                                                    {variant.stock > 10
                                                        ? "Còn hàng"
                                                        : `Còn ${variant.stock}`}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="h-3 w-3" />
                                                <span>Hết hàng</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Out of Stock Overlay */}
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/60">
                                    <span className="text-sm font-medium text-red-600">Hết hàng</span>
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
