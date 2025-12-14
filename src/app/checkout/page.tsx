"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { AddressStep } from "@/components/checkout/AddressStep";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { ReviewStep } from "@/components/checkout/ReviewStep";
import { Button } from "@/components/ui/button";
import { MapPin, CreditCard, CheckCircle2, ArrowLeft, ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart.store";
import { useAuthStore } from "@/lib/store/auth.store";
import { useOrderStore } from "@/lib/store/order.store";
import { toast } from "sonner";
import type { PaymentMethod } from "@/types/order";
import { createPaymentUrl } from "@/lib/api/order.service";

const steps = [
    { label: "Địa chỉ giao hàng", icon: <MapPin className="h-5 w-5" /> },
    { label: "Thanh toán", icon: <CreditCard className="h-5 w-5" /> },
    { label: "Xác nhận", icon: <CheckCircle2 className="h-5 w-5" /> },
];

export default function CheckoutPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { cart, removeSelectedItems, selectedItemIds } = useCartStore();
    const { createOrder } = useOrderStore();

    const selectedItems = cart?.items.filter(item => selectedItemIds.includes(item.id)) || [];
    const hasSelectedItems = selectedItems.length > 0;

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [orderNote, setOrderNote] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
        } else if (!cart || cart.items.length === 0) {
            router.push("/cart");
        } else if (!hasSelectedItems) {
            toast.error("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán");
            router.push("/cart");
        }
    }, [isAuthenticated, cart, hasSelectedItems, router]);

    if (!isAuthenticated || !cart || cart.items.length === 0) {
        return null;
    }

    const handleNext = () => {
        if (currentStep === 1) {
            if (!selectedAddressId) {
                toast.error("Vui lòng chọn địa chỉ giao hàng");
                return;
            }
        }

        if (currentStep === 2) {
            if (!selectedPaymentMethod) {
                toast.error("Vui lòng chọn phương thức thanh toán");
                return;
            }
        }

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Vui lòng chọn địa chỉ giao hàng");
            setCurrentStep(1);
            return;
        }

        if (!selectedPaymentMethod) {
            toast.error("Vui lòng chọn phương thức thanh toán");
            setCurrentStep(2);
            return;
        }

        if (!termsAccepted) {
            toast.error("Vui lòng đồng ý với điều khoản và điều kiện");
            return;
        }

        try {
            setIsPlacingOrder(true);

            const shippingFee = 30000; // Fixed shipping fee

            const orderData = {
                addressId: selectedAddressId,
                paymentMethod: selectedPaymentMethod,
                note: orderNote,
                shippingFee: shippingFee,
                items: selectedItems.map(item => ({
                    productId: item.productId,
                    variantId: item.variantId,
                    productName: `Product #${item.productId}`, // Temporary - should come from product data
                    sku: `SKU-${item.variantId}`, // Temporary
                    attributesName: item.attributesName || "",
                    quantity: item.quantity,
                    price: item.priceSnapshot,
                })),
            };

            const order = await createOrder(orderData);

            if (selectedPaymentMethod === "COD") {
                await removeSelectedItems();
                toast.success("Đặt hàng thành công!");
                router.push(`/orders/${order.id}/success`);
            } else {
                const paymentRequest = {
                    orderId: order.id.toString(),
                    paymentMethod: selectedPaymentMethod,
                    amount: order.total,
                };
                const paymentResponse = await createPaymentUrl(paymentRequest);
                if (paymentResponse && paymentResponse.paymentUrl) {
                    // Open VNPay payment in new tab
                    window.open(paymentResponse.paymentUrl, '_blank');
                    await removeSelectedItems();
                    toast.success("Đã chuyển đến trang thanh toán VNPay");
                    router.push(`/orders/${order.id}/success`);
                } else {
                    throw new Error("Không thể tạo link thanh toán");
                }
            }
        } catch (error: any) {
            console.error("Place order error:", error);
            toast.error(error.response?.data?.message || "Đặt hàng thất bại. Vui lòng thử lại.");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <ShoppingBag className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>
                            <p className="text-sm text-gray-600 mt-0.5">
                                Hoàn tất đơn hàng của bạn
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stepper */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <CheckoutStepper steps={steps} currentStep={currentStep} />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Steps Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentStep === 1 && (
                                <AddressStep
                                    selectedAddressId={selectedAddressId}
                                    onSelectAddress={setSelectedAddressId}
                                />
                            )}

                            {currentStep === 2 && (
                                <PaymentStep
                                    selectedMethod={selectedPaymentMethod}
                                    onSelectMethod={setSelectedPaymentMethod}
                                />
                            )}

                            {currentStep === 3 && (
                                <ReviewStep
                                    selectedAddressId={selectedAddressId}
                                    selectedPaymentMethod={selectedPaymentMethod}
                                    orderNote={orderNote}
                                    onNoteChange={setOrderNote}
                                    termsAccepted={termsAccepted}
                                    onTermsChange={setTermsAccepted}
                                    selectedItems={selectedItems}
                                />
                            )}
                        </motion.div>

                        {/* Navigation Buttons */}
                        <div className="mt-6 flex gap-4">
                            {currentStep > 1 && (
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                    className="gap-2 border-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Quay lại
                                </Button>
                            )}

                            {currentStep < 3 ? (
                                <Button
                                    onClick={handleNext}
                                    className="ml-auto gap-2"
                                >
                                    Tiếp tục
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handlePlaceOrder}
                                    disabled={isPlacingOrder || !termsAccepted}
                                    className="ml-auto gap-2 bg-primary hover:bg-primary/90"
                                >
                                    {isPlacingOrder ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            Đặt hàng
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <OrderSummary selectedItems={selectedItems} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
