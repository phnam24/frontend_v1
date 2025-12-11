"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Cpu, HardDrive, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/lib/store/wishlist.store";
import { getVariantsByProduct, getVariantSpecs } from "@/lib/api/product.service";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

interface ProductSpecs {
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    screen?: string;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const [imageError, setImageError] = useState(false);
    const [specs, setSpecs] = useState<ProductSpecs>({});
    const [showParticles, setShowParticles] = useState(false);

    const inWishlist = isInWishlist(product.id);
    const discount = product.priceSale < product.priceList
        ? Math.round(((product.priceList - product.priceSale) / product.priceList) * 100)
        : 0;
    const savings = product.priceList - product.priceSale;

    // Fetch specs from first variant
    useEffect(() => {
        const fetchSpecs = async () => {
            try {
                const variants = await getVariantsByProduct(product.id);
                if (variants && variants.length > 0) {
                    const variantSpecs = await getVariantSpecs(variants[0].id);

                    // Map specs to display format
                    const specsMap: ProductSpecs = {};
                    variantSpecs.forEach((spec: any) => {
                        const label = spec.attribute?.label?.toLowerCase() || "";
                        if (label.includes("cpu") || label.includes("processor")) {
                            specsMap.cpu = spec.value;
                        } else if (label.includes("gpu") || label.includes("graphics") || label.includes("vga")) {
                            specsMap.gpu = spec.value;
                        } else if (label.includes("ram") || label.includes("memory")) {
                            specsMap.ram = spec.value;
                        } else if (label.includes("storage") || label.includes("ssd") || label.includes("hdd")) {
                            specsMap.storage = spec.value;
                        } else if (label.includes("screen") || label.includes("display") || label.includes("màn hình")) {
                            specsMap.screen = spec.value;
                        }
                    });

                    setSpecs(specsMap);
                }
            } catch (error) {
                console.error("Failed to fetch specs:", error);
            }
        };

        fetchSpecs();
    }, [product.id]);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
            // Show particles animation
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 1000);
        }
    };

    // Format price in Vietnamese
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={400}
            className="h-full"
        >
            <Link href={`/products/${product.slug}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-primary-300 transition-all duration-300 flex flex-col min-h-[480px] h-full"
                >
                    {/* Discount Badge */}
                    {discount > 0 && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-3 py-1 shadow-lg">
                                -{discount}%
                            </Badge>
                        </motion.div>
                    )}

                    {/* Product Image with Zoom */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full"
                        >
                            <Image
                                src={imageError ? "/placeholder-product.png" : (product.avatar || product.firstImage)}
                                alt={product.name}
                                fill
                                className="object-cover"
                                onError={() => setImageError(true)}
                            />
                        </motion.div>

                        {/* Wishlist Button - Bottom Right on Image */}
                        <motion.button
                            onClick={handleWishlistToggle}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "absolute bottom-3 right-3 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all shadow-lg",
                                inWishlist && "bg-red-50"
                            )}
                        >
                            <motion.div
                                animate={inWishlist ? { scale: [1, 1.3, 1] } : {}}
                                transition={{ duration: 0.3 }}
                            >
                                <Heart
                                    className={cn(
                                        "h-5 w-5 transition-colors",
                                        inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
                                    )}
                                />
                            </motion.div>

                            {/* Particles Effect */}
                            <AnimatePresence>
                                {showParticles && (
                                    <>
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0, x: 0, y: 0 }}
                                                animate={{
                                                    scale: [0, 1, 0],
                                                    x: Math.cos((i * Math.PI) / 3) * 30,
                                                    y: Math.sin((i * Math.PI) / 3) * 30,
                                                }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.6 }}
                                                className="absolute w-2 h-2 bg-red-500 rounded-full"
                                            />
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Button
                                    size="sm"
                                    className="bg-white text-primary-600 hover:bg-primary-50"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Quick view functionality
                                    }}
                                >
                                    Xem nhanh
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3 flex flex-col flex-grow">
                        {/* Brand - Always show */}
                        <p className="text-xs text-primary-600 uppercase font-bold tracking-wide">
                            {product.brand?.name || "NO BRAND"}
                        </p>

                        {/* Product Name - Fixed height */}
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 h-10 group-hover:text-primary-600 transition-colors">
                            {product.name}
                        </h3>

                        {/* Price Section */}
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                    {formatPrice(product.priceSale)}
                                </span>
                                {discount > 0 && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {formatPrice(product.priceList)}
                                    </span>
                                )}
                            </div>

                            {savings > 0 && (
                                <p className="text-xs text-green-600 font-medium">
                                    Tiết kiệm {formatPrice(savings)}
                                </p>
                            )}
                        </div>

                        {/* Specs - Flexible height to fill space */}
                        <div className="flex-grow space-y-1.5 text-xs text-gray-600 min-h-[60px]">
                            {specs.cpu && (
                                <div className="flex items-center gap-1.5">
                                    <Cpu className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                                    <span className="truncate">{specs.cpu}</span>
                                </div>
                            )}
                            {specs.ram && specs.storage && (
                                <div className="flex items-center gap-1.5">
                                    <HardDrive className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                                    <span className="truncate">{specs.ram} / {specs.storage}</span>
                                </div>
                            )}
                            {specs.screen && (
                                <div className="flex items-center gap-1.5">
                                    <Monitor className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                                    <span className="truncate">{specs.screen}</span>
                                </div>
                            )}
                        </div>

                        {/* Add to Cart Button - Full Width at Bottom */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-md hover:shadow-lg transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onAddToCart?.(product);
                                }}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Thêm vào giỏ
                            </Button>
                        </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
                    </div>
                </motion.div>
            </Link>
        </Tilt>
    );
}
