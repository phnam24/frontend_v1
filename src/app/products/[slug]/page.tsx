"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProductById, getAllProducts } from "@/lib/api/product.service";
import { extractIdFromSlug } from "@/lib/utils/slug";
import { Header } from "@/components/layout/Header";
import { ChevronRight, ShoppingCart, Heart, Share2, Check, Star, Package, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useWishlistStore } from "@/lib/store/wishlist.store";
import { useCartStore } from "@/lib/store/cart.store";
import { cn } from "@/lib/utils";
import { ImageGallery } from "@/components/products/ImageGallery";
import { AnimatedPrice } from "@/components/ui/AnimatedPrice";
import { VariantSelector } from "@/components/products/VariantSelector";
import { CartToast } from "@/components/ui/CartToast";
import { ExpandableDescription } from "@/components/ui/ExpandableDescription";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage() {
    const params = useParams();
    const slugWithId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const [activeTab, setActiveTab] = useState("description");
    const [selectedColor, setSelectedColor] = useState<string>();
    const [selectedSize, setSelectedSize] = useState<string>();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const { addItem } = useCartStore();

    // Extract ID from slug (format: {slug}-{id})
    const productId = slugWithId ? extractIdFromSlug(slugWithId) : null;

    // Fetch product by ID - OPTIMIZED!
    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId as number),
        enabled: !!productId && !isNaN(productId),
    });

    // Fetch all products for related products section
    const { data: productsData } = useQuery({
        queryKey: ["products-for-related"],
        queryFn: () => getAllProducts({ page: 1, limit: 20 }),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-200 rounded" />
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded" />
                                <div className="h-6 bg-gray-200 rounded w-3/4" />
                                <div className="h-12 bg-gray-200 rounded w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <p className="text-red-600">Không tìm thấy sản phẩm</p>
                        <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
                            Quay lại danh sách sản phẩm
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Parse images
    const parseImages = (imagesStr: string): string[] => {
        if (!imagesStr) return [];
        const cleaned = imagesStr.replace(/[\[\]"']/g, '');
        return cleaned.split(',')
            .map(img => img.trim())
            .filter(img => img.length > 0 && (img.startsWith('http://') || img.startsWith('https://')));
    };

    const images = product.images
        ? parseImages(product.images)
        : (product.avatar || product.firstImage) ? [product.avatar || product.firstImage] : [];
    const validImages = images.length > 0 ? images : ['/placeholder-product.png'];

    const discount = product.priceSale < product.priceList
        ? Math.round(((product.priceList - product.priceSale) / product.priceList) * 100)
        : 0;
    const savings = product.priceList - product.priceSale;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    };

    const inWishlist = isInWishlist(product.id);

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    const handleAddToCart = async () => {
        try {
            // Get first variant or use product ID
            const variantId = product.variants?.[0]?.id || product.id;
            const variantName = selectedColor && selectedSize
                ? `${selectedColor} - ${selectedSize}`
                : product.variants?.[0]
                    ? [product.variants[0].color, product.variants[0].size].filter(Boolean).join(" - ")
                    : "";

            await addItem({
                productId: product.id,
                variantId: variantId,
                quantity: 1,
                price: product.priceSale || product.priceList,
                attributesName: variantName,
            });

            // Show custom toast with product info
            toast.custom((t) => (
                <CartToast
                    productName={product.name}
                    productImage={validImages[0]}
                    quantity={1}
                    price={product.priceSale}
                    onClose={() => toast.dismiss(t.id)}
                />
            ), {
                duration: 5000,
            });
        } catch (error) {
            console.error("Add to cart error:", error);
        }
    };

    // Mock variant data (replace with real data from API)
    const mockColors = [
        { id: "gray", name: "Xám", hex: "#6B7280", available: true, stock: 15 },
        { id: "silver", name: "Bạc", hex: "#C0C0C0", available: true, stock: 8 },
        { id: "black", name: "Đen", hex: "#1F2937", available: false, stock: 0 },
    ];

    const mockSizes = [
        { id: "13", label: '13"', available: true, stock: 12 },
        { id: "14", label: '14"', available: true, stock: 20 },
        { id: "15", label: '15"', available: true, stock: 5 },
        { id: "16", label: '16"', available: false, stock: 0 },
    ];

    const tabs = [
        { id: "description", label: "Mô tả sản phẩm" },
        { id: "specs", label: "Thông số chi tiết" },
        { id: "reviews", label: "Đánh giá (128)" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Breadcrumb */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Trang chủ
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/products" className="hover:text-primary transition-colors">
                            Sản phẩm
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        {product.brand && (
                            <>
                                <Link href={`/brands/${product.brand.id}`} className="hover:text-primary transition-colors">
                                    {product.brand.name}
                                </Link>
                                <ChevronRight className="h-4 w-4" />
                            </>
                        )}
                        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Detail */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left - Images (4 columns) */}
                    <div className="lg:col-span-4">
                        <ImageGallery
                            images={validImages}
                            productName={product.name}
                            discount={discount}
                        />

                        {/* Short Description below gallery */}
                        {product.shortDescription && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white rounded-lg p-4 mt-4 border border-gray-200"
                            >
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Mô tả ngắn</h3>
                                <ExpandableDescription
                                    content={product.shortDescription}
                                    maxLength={500}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Middle - Product Info (5 columns) */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg p-6 space-y-4"
                        >
                            {/* Brand */}
                            {product.brand && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Thương hiệu:</span>
                                    <Link href={`/brands/${product.brand.id}`} className="text-sm font-medium text-primary hover:underline">
                                        {product.brand.name}
                                    </Link>
                                    <Badge variant="outline" className="ml-auto">
                                        <Shield className="h-3 w-3 mr-1" />
                                        Chính hãng
                                    </Badge>
                                </div>
                            )}

                            {/* Product Name */}
                            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

                            {/* Rating & Reviews (Mock) */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">(128 đánh giá)</span>
                                <span className="text-sm text-gray-400">|</span>
                                <span className="text-sm text-gray-600">Đã bán: 256</span>
                            </div>

                            {/* Animated Price */}
                            <AnimatedPrice
                                currentPrice={product.priceSale}
                                originalPrice={product.priceList}
                                discount={discount}
                                savings={savings}
                            />

                            {/* Variant Selector */}
                            <VariantSelector
                                colors={mockColors}
                                sizes={mockSizes}
                                selectedColor={selectedColor}
                                selectedSize={selectedSize}
                                onColorChange={setSelectedColor}
                                onSizeChange={setSelectedSize}
                            />

                            {/* Promotions */}
                            <div className="border rounded-lg p-4 space-y-2">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <Package className="h-5 w-5 text-primary" />
                                    Ưu đãi đặc biệt
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Nhập mã <strong className="text-primary">FREESHIP</strong> miễn phí vận chuyển đơn từ 900.000đ</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Giảm ngay 200.000đ khi thanh toán qua VNPAY</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Trả góp 0% qua thẻ tín dụng (3-6 tháng)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Bảo hành chính hãng 24 tháng</span>
                                    </div>
                                </div>
                            </div>

                            {/* Buy Buttons */}
                            <div className="space-y-3">
                                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-12">
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    MUA NGAY
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full border-primary text-primary hover:bg-primary/10 h-12"
                                    onClick={handleAddToCart}
                                >
                                    THÊM VÀO GIỎ HÀNG
                                </Button>
                            </div>

                            {/* Wishlist & Share */}
                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleWishlistToggle}
                                >
                                    <Heart className={cn("h-4 w-4 mr-2", inWishlist && "fill-red-500 text-red-500")} />
                                    Yêu thích
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Delivery Info */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Truck className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Giao hàng nhanh 2h</span>
                                    <span className="text-gray-500">- Miễn phí với đơn từ 900.000đ</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="h-4 w-4 text-primary" />
                                    <span className="font-medium">Đổi trả trong 10 ngày</span>
                                    <span className="text-gray-500">- Nếu sản phẩm lỗi</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right - Specs (3 columns) */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-lg p-6"
                        >
                            <h2 className="text-lg font-bold mb-4">Thông số kỹ thuật</h2>
                            <div className="space-y-2 text-sm">
                                {product.brand && (
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Thương hiệu</span>
                                        <span className="font-medium text-right">{product.brand.name}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Part Number</span>
                                    <span className="font-medium text-right">83K6005UVN</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">CPU</span>
                                    <span className="font-medium text-right">AMD Ryzen 5 7535HS</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">RAM</span>
                                    <span className="font-medium text-right">24GB DDR5</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Ổ cứng</span>
                                    <span className="font-medium text-right">512GB SSD</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Card đồ họa</span>
                                    <span className="font-medium text-right">AMD Radeon</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Màn hình</span>
                                    <span className="font-medium text-right">14" FHD IPS</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Hệ điều hành</span>
                                    <span className="font-medium text-right">Windows 11</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Trọng lượng</span>
                                    <span className="font-medium text-right">~1.4kg</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Màu sắc</span>
                                    <span className="font-medium text-right">Xám</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Animated Tabs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6 bg-white rounded-lg overflow-hidden"
                >
                    {/* Tab Navigation */}
                    <div className="border-b relative">
                        <div className="flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative px-6 py-3 text-sm font-medium transition-colors",
                                        activeTab === tab.id
                                            ? "text-primary"
                                            : "text-gray-600 hover:text-gray-900"
                                    )}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {activeTab === "description" && (
                                <motion.div
                                    key="description"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ExpandableDescription
                                        content={product.description}
                                        maxLength={1000}
                                    />
                                </motion.div>
                            )}

                            {activeTab === "specs" && (
                                <motion.div
                                    key="specs"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-2 gap-4"
                                >
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg mb-3">Cấu hình</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">CPU</span>
                                                <span className="font-medium">AMD Ryzen 5 7535HS</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">RAM</span>
                                                <span className="font-medium">24GB DDR5</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Ổ cứng</span>
                                                <span className="font-medium">512GB SSD NVMe</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">VGA</span>
                                                <span className="font-medium">AMD Radeon Graphics</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg mb-3">Màn hình & Âm thanh</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Màn hình</span>
                                                <span className="font-medium">14" FHD IPS</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Độ phân giải</span>
                                                <span className="font-medium">1920 x 1080</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Tần số quét</span>
                                                <span className="font-medium">60Hz</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Âm thanh</span>
                                                <span className="font-medium">Stereo speakers</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "reviews" && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center py-12 text-gray-500"
                                >
                                    <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>Chưa có đánh giá nào</p>
                                    <Button className="mt-4">Viết đánh giá đầu tiên</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Related Products */}
                {productsData && productsData.result.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-6"
                    >
                        <RelatedProducts
                            products={productsData.result}
                            currentProductId={String(product.id)}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
