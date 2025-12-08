"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, ShoppingBag, Lock } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        icon: User,
        label: "Thông tin cá nhân",
        href: "/profile",
    },
    {
        icon: MapPin,
        label: "Địa chỉ",
        href: "/profile/addresses",
    },
    {
        icon: ShoppingBag,
        label: "Đơn hàng",
        href: "/orders",
    },
    {
        icon: Lock,
        label: "Đổi mật khẩu",
        href: "/profile/change-password",
    },
];

export function ProfileSidebar() {
    const { user } = useAuthStore();
    const pathname = usePathname();

    if (!user) return null;

    // Get initials for avatar
    const initials = `${user.lastName.charAt(0)}${user.firstName.charAt(0)}`.toUpperCase();

    return (
        <div className="w-full lg:w-64 space-y-4">
            {/* User Card */}
            <div className="bg-card border rounded-lg p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-3">
                        {initials}
                    </div>
                    <h3 className="font-semibold text-lg">
                        {user.lastName} {user.firstName}
                    </h3>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-card border rounded-lg overflow-hidden">
                <nav className="flex flex-col">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b last:border-b-0",
                                    isActive
                                        ? "bg-primary text-primary-foreground font-medium"
                                        : "hover:bg-muted"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
