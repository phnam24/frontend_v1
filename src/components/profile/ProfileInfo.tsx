"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Calendar, Mail, Phone, Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";
import { updateUser } from "@/lib/api/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const profileSchema = z.object({
    lastName: z.string().min(2, "Họ phải có ít nhất 2 ký tự"),
    firstName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    dob: z.string().min(1, "Ngày sinh là bắt buộc"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileInfo() {
    const { user, updateUser: updateUserState, loadUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            lastName: "",
            firstName: "",
            dob: "",
            email: "",
            phone: "",
        },
    });

    // Update form values when user data changes
    useEffect(() => {
        if (user) {
            reset({
                lastName: user.lastName || "",
                firstName: user.firstName || "",
                dob: user.dob || "",
                email: (user as any).email || "",
                phone: (user as any).phone || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        if (!user) return;

        try {
            setIsLoading(true);

            // Call real API to update user
            await updateUser(user.id, {
                lastName: data.lastName,
                firstName: data.firstName,
                dob: data.dob,
                email: data.email || undefined,
                phone: data.phone || undefined,
            });

            // Reload user data from server
            await loadUser();

            setIsEditing(false);
            toast.success("Cập nhật thông tin thành công!");
        } catch (error: any) {
            console.error("Update profile error:", error);
            const message = error.response?.data?.message || "Không thể cập nhật thông tin. Vui lòng thử lại sau.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    if (!user) {
        return (
            <Card>
                <CardContent className="py-8">
                    <p className="text-center text-muted-foreground">Đang tải thông tin...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Thông tin cá nhân</CardTitle>
                        <CardDescription>Quản lý thông tin tài khoản của bạn</CardDescription>
                    </div>
                    {!isEditing && (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            Chỉnh sửa
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Username - Read only */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                            Tên đăng nhập
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={user.username}
                                className="pl-10 bg-muted"
                                disabled
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Tên đăng nhập không thể thay đổi</p>
                    </div>

                    {/* Name fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                                Họ <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="lastName"
                                    placeholder="Nguyễn"
                                    className="pl-10"
                                    disabled={!isEditing}
                                    {...register("lastName")}
                                />
                            </div>
                            {errors.lastName && (
                                <p className="text-sm text-destructive">{errors.lastName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                                Tên <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="firstName"
                                    placeholder="Văn A"
                                    className="pl-10"
                                    disabled={!isEditing}
                                    {...register("firstName")}
                                />
                            </div>
                            {errors.firstName && (
                                <p className="text-sm text-destructive">{errors.firstName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                className="pl-10"
                                disabled={!isEditing}
                                {...register("email")}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                            Số điện thoại
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="0912345678"
                                className="pl-10"
                                disabled={!isEditing}
                                {...register("phone")}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                        <label htmlFor="dob" className="text-sm font-medium">
                            Ngày sinh
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="dob"
                                type="date"
                                className="pl-10"
                                disabled={!isEditing}
                                {...register("dob")}
                            />
                        </div>
                        {errors.dob && (
                            <p className="text-sm text-destructive">{errors.dob.message}</p>
                        )}
                        <p className="text-xs text-muted-foreground">Để nhận ưu đãi sinh nhật</p>
                    </div>

                    {/* Account ID - Read only */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                            ID tài khoản
                        </label>
                        <Input
                            value={user.id}
                            className="bg-muted font-mono text-xs"
                            disabled
                        />
                    </div>

                    {/* Action buttons */}
                    {isEditing && (
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Lưu thay đổi
                            </Button>
                            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                                Hủy
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
