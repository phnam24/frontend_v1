import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-primary">TechStore</span>
                </Link>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Chào mừng trở lại</CardTitle>
                        <CardDescription className="text-center">
                            Nhập thông tin đăng nhập của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
