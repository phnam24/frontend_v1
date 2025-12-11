"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store/auth.store";
import { Header } from "@/components/layout/Header";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { OrderTimeline } from "@/components/profile/OrderTimeline";
import { mockOrders } from "@/lib/mock/orders";

export default function OrdersPage() {
    const router = useRouter();
    const { user, isAuthenticated, loadUser } = useAuthStore();

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Đang tải...</p>
            </div>
        );
    }

    // Filter orders for current user
    const userOrders = mockOrders.filter(order => order.userId === user.id || order.userId === "user-1");

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
                        <Link href="/profile" className="hover:text-foreground transition-colors">
                            Tài khoản
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">Đơn hàng</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Package className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">Đơn hàng của tôi</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Quản lý và theo dõi đơn hàng của bạn
                    </p>
                </motion.div>

                {/* Layout with Sidebar */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <ProfileSidebar />

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1"
                    >
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <OrderTimeline orders={userOrders} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
