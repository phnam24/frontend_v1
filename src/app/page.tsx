"use client";

import Link from "next/link";
import { ShoppingBag, Laptop, Smartphone } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
    const { loadUser } = useAuthStore();

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Chào mừng đến TechStore
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Khám phá laptop và điện thoại di động mới nhất với giá tốt nhất
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            Mua sắm ngay
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Mua sắm theo danh mục</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <Link
                            href="/products?category=laptops"
                            className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-primary transition-all p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
                        >
                            <div className="flex flex-col items-center text-center">
                                <Laptop className="h-16 w-16 mb-4 text-primary group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold mb-2">Laptop</h3>
                                <p className="text-muted-foreground">Laptop hiệu năng cao cho công việc và giải trí</p>
                            </div>
                        </Link>
                        <Link
                            href="/products?category=phones"
                            className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-secondary transition-all p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900"
                        >
                            <div className="flex flex-col items-center text-center">
                                <Smartphone className="h-16 w-16 mb-4 text-secondary group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold mb-2">Điện thoại</h3>
                                <p className="text-muted-foreground">Smartphone mới nhất với công nghệ tiên tiến</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t mt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-sm text-muted-foreground">
                        <p>&copy; 2024 TechStore. Tất cả quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
