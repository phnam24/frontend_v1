"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useCartStore } from "@/lib/store/cart.store";
import { useAuthStore } from "@/lib/store/auth.store";

export default function CartPage() {
    const router = useRouter();
    const { cart, fetchCart, isLoading } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/cart");
            return;
        }
        fetchCart();
    }, [isAuthenticated, fetchCart, router]);

    const items = cart?.items || [];
    const totalItems = cart?.totalItems || 0;
    const subtotal = cart?.totalAmount || 0;

    if (isLoading && !cart) {
        return (
            <div className="min-h-screen bg-muted/30">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4" />
                        <div className="h-64 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <Header />

            {/* Breadcrumb */}
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">
                            Trang chủ
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">Giỏ hàng</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <ShoppingBag className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
                    </div>
                    {totalItems > 0 && (
                        <p className="text-muted-foreground">
                            Bạn có {totalItems} sản phẩm trong giỏ hàng
                        </p>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <EmptyCart />
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <CartSummary
                                subtotal={subtotal}
                                total={subtotal}
                                itemCount={totalItems}
                            />
                        </div>
                    </div>
                )}

                {/* Continue Shopping */}
                {items.length > 0 && (
                    <div className="mt-6 text-center">
                        <Link
                            href="/products"
                            className="text-primary hover:underline inline-flex items-center gap-2"
                        >
                            <ChevronRight className="h-4 w-4 rotate-180" />
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
