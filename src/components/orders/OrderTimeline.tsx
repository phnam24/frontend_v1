"use client";

import { motion } from "framer-motion";
import { Package, Calendar, CreditCard, CheckCircle2, Clock, Truck, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";

interface OrderTimelineProps {
    orders: Order[];
}

const statusConfig = {
    PENDING: {
        label: "Đang xử lý",
        color: "text-yellow-700",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-300",
        badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
        iconBg: "bg-yellow-100",
        icon: Clock,
    },
    PAID: {
        label: "Đã thanh toán",
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-300",
        badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
        iconBg: "bg-blue-100",
        icon: CheckCircle2,
    },
    SHIPPING: {
        label: "Đang giao",
        color: "text-purple-700",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
        iconBg: "bg-purple-100",
        icon: Truck,
    },
    COMPLETED: {
        label: "Hoàn thành",
        color: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-300",
        badgeColor: "bg-green-100 text-green-700 border-green-200",
        iconBg: "bg-green-100",
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: "Đã hủy",
        color: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-300",
        badgeColor: "bg-red-100 text-red-700 border-red-200",
        iconBg: "bg-red-100",
        icon: XCircle,
    },
};

export function OrderTimeline({ orders }: OrderTimelineProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chưa có đơn hàng</h3>
                <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {orders.map((order, index) => {
                const config = statusConfig[order.status as keyof typeof statusConfig];
                const Icon = config?.icon || Package;

                return (
                    <Link key={order.id} href={`/orders/${order.id}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ y: -2 }}
                            className="relative group"
                        >
                            {/* Timeline connector */}
                            {index < orders.length - 1 && (
                                <div className="absolute left-6 top-16 bottom-0 w-px bg-gray-200 -mb-3 z-0" />
                            )}

                            {/* Order Card */}
                            <div className="relative bg-white rounded-xl border-2 border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 overflow-hidden">
                                {/* Status accent bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgColor} ${config.borderColor.replace('border-', 'to-')}`} />

                                <div className="flex gap-3 p-3">
                                    {/* Status Icon */}
                                    <div className="flex-shrink-0 relative">
                                        <div className={`w-12 h-12 rounded-xl ${config.iconBg} border-2 ${config.borderColor} flex items-center justify-center shadow-sm`}>
                                            <Icon className={`h-5 w-5 ${config.color}`} />
                                        </div>
                                        {/* Pulse for active orders */}
                                        {(order.status === "PENDING" || order.status === "SHIPPING") && (
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.iconBg} opacity-75`}></span>
                                                <span className={`relative inline-flex rounded-full h-3 w-3 ${config.iconBg} border ${config.borderColor}`}></span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Order Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-gray-900 text-base">
                                                        Đơn hàng #{order.id}
                                                    </h3>
                                                    <Badge className={`${config.badgeColor} border text-xs px-2 py-0`}>
                                                        {config.label}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                        </div>

                                        {/* Order Items Preview */}
                                        <div className="bg-gray-50 rounded-lg p-2 mb-2 space-y-1 border border-gray-100">
                                            {order.items.slice(0, 2).map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-1.5 text-xs">
                                                    <div className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                                                    <p className="text-gray-700 flex-1 line-clamp-1">
                                                        <span className="font-medium">{item.productName || `Variant #${item.variantId}`}</span>
                                                        {item.size && item.color && (
                                                            <span className="text-gray-500 ml-1">
                                                                ({item.color}, {item.size})
                                                            </span>
                                                        )}
                                                        <span className="text-gray-500 ml-1">×{item.quantity}</span>
                                                    </p>
                                                </div>
                                            ))}
                                            {order.items.length > 2 && (
                                                <p className="text-xs text-gray-500 pl-3">
                                                    +{order.items.length - 2} sản phẩm khác
                                                </p>
                                            )}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                                                    <Package className="h-3 w-3" />
                                                    <span className="font-medium">{order.items.length}</span>
                                                </span>
                                                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                                                    <CreditCard className="h-3 w-3" />
                                                    <span className="font-medium">{order.paymentMethod}</span>
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 mb-0.5">Tổng tiền</p>
                                                <p className="text-lg font-bold text-primary">
                                                    {formatPrice(order.total)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}
