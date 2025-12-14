"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getAllBrands, searchProducts } from "@/lib/api/product.service";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { CategoryQuickLinks } from "@/components/products/CategoryQuickLinks";
import { SortDropdown } from "@/components/products/SortDropdown";
import { ActiveFilters } from "@/components/products/ActiveFilters";
import { BrandRow } from "@/components/products/BrandRow";
import { Header } from "@/components/layout/Header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useFilterStore } from "@/lib/store/filter.store";
import { useMemo } from "react";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "25");
    const search = searchParams.get("search") || "";

    const { sortBy, priceRange, brands, cpu, ram, storage, screenSize, gpu } = useFilterStore();

    // Fetch all brands for mapping
    const { data: brandsData } = useQuery({
        queryKey: ["brands-all"],
        queryFn: () => getAllBrands({ page: 1, limit: 20 }),
    });

    // Create brand map
    const brandMap = useMemo(() => {
        if (!brandsData?.result) return new Map();
        return new Map(brandsData.result.map(b => [b.id, b]));
    }, [brandsData]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["products", page, limit, search],
        queryFn: () => {
            // Use dedicated search endpoint when search query exists
            if (search.trim()) {
                return searchProducts({ name: search, page, limit });
            }
            return getAllProducts({ page, limit });
        },
    });

    // Client-side filtering and sorting
    const filteredAndSortedProducts = useMemo(() => {
        if (!data?.result) return [];

        // Populate products with brand data
        let products = data.result.map(p => ({
            ...p,
            brand: brandMap.get(p.brandId),
        }));

        // Note: Search filtering is done server-side
        // Client-side filters below are for additional filtering

        // Apply filters
        // Price filter
        products = products.filter(
            (p) => p.priceSale >= priceRange.min && p.priceSale <= priceRange.max
        );

        // Brand filter
        if (brands.length > 0) {
            products = products.filter((p) => brands.includes(p.brandId));
        }

        // Note: CPU, RAM, Storage, Screen, GPU filters would need variant data
        // For now, we'll skip these as they require additional API calls

        // Apply sorting
        switch (sortBy) {
            case "price-asc":
                products.sort((a, b) => a.priceSale - b.priceSale);
                break;
            case "price-desc":
                products.sort((a, b) => b.priceSale - a.priceSale);
                break;
            case "discount":
                products.sort((a, b) => {
                    const discountA = ((a.priceList - a.priceSale) / a.priceList) * 100;
                    const discountB = ((b.priceList - b.priceSale) / b.priceList) * 100;
                    return discountB - discountA;
                });
                break;
            case "newest":
            default:
                products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return products;
    }, [data, brandMap, search, priceRange, brands, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Breadcrumb */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Trang chủ
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">Sản phẩm</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-4">
                {/* 2-Column Layout: Sidebar + Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Left Sidebar - Filters */}
                    <aside className="lg:col-span-1">
                        <FilterSidebar />
                    </aside>

                    {/* Right Content - Brand, Categories, Products */}
                    <main className="lg:col-span-3 space-y-4">
                        {/* Brand Row */}
                        <BrandRow />

                        {/* Category Quick Links - Compact */}
                        <CategoryQuickLinks />

                        {/* Page Header with Sort */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {search ? `Kết quả tìm kiếm: "${search}"` : "Máy tính Laptop"}
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    {data?.total} sản phẩm
                                </p>
                            </div>
                            <SortDropdown />
                        </div>

                        {/* Active Filters */}
                        <ActiveFilters />

                        {/* Products Grid */}
                        {isLoading ? (
                            <ProductGridSkeleton count={limit} />
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-600">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
                            </div>
                        ) : data ? (
                            <>
                                <ProductGrid products={filteredAndSortedProducts} />

                                {/* Pagination */}
                                <Pagination
                                    currentPage={page}
                                    totalPages={data.totalPages}
                                    baseUrl="/products"
                                    searchParams={{ limit: limit.toString(), ...(search && { search }) }}
                                />
                            </>
                        ) : null}
                    </main>
                </div>
            </div >
        </div >
    );
}
