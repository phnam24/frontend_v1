"use client";

import Link from "next/link";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { user, isAuthenticated, logout } = useAuthStore();

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <ShoppingBag className="h-8 w-8" />
                        <span>TechStore</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                            Sản phẩm
                        </Link>
                        <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                            Danh mục
                        </Link>
                        <Link href="/brands" className="text-sm font-medium hover:text-primary transition-colors">
                            Thương hiệu
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {isAuthenticated && user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2">
                                        <User className="h-4 w-4" />
                                        <span className="font-medium">{user.lastName} {user.firstName}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="h-4 w-4 mr-2" />
                                            Thông tin cá nhân
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/orders" className="cursor-pointer">
                                            <ShoppingBag className="h-4 w-4 mr-2" />
                                            Đơn hàng của tôi
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Đăng xuất
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                                    Đăng nhập
                                </Link>
                                <Link href="/register" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
