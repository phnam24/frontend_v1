import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 py-12">
            <div className="w-full max-w-2xl">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold text-primary">TechStore</span>
                </Link>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Tạo tài khoản</CardTitle>
                        <CardDescription className="text-center">
                            Nhập thông tin của bạn để bắt đầu
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
