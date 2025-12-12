"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api/product.service";
import { cn } from "@/lib/utils";

export function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Fetch products for search suggestions
    const { data: productsData } = useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProducts({ page: 1, size: 100 }),
    });

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("recentSearches");
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    // Filter products based on query
    const suggestions = query.length >= 2 && productsData
        ? productsData.result.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        : [];

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        // Save to recent searches
        const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));

        // Navigate to products page with search query
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        setIsOpen(false);
        setQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch(query);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    return (
        <div className="relative flex-1 max-w-2xl">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Suggestions Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                        >
                            {/* Search Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="p-2">
                                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                        <TrendingUp className="h-4 w-4" />
                                        Gợi ý
                                    </div>
                                    {suggestions.map((product, index) => (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.slug}`}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setQuery("");
                                            }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                <Search className="h-4 w-4 text-gray-400" />
                                                <span className="flex-1 text-sm">{product.name}</span>
                                                <span className="text-xs text-primary font-semibold">
                                                    {new Intl.NumberFormat("vi-VN").format(product.priceSale)} đ
                                                </span>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Recent Searches */}
                            {query.length === 0 && recentSearches.length > 0 && (
                                <div className="p-2 border-t">
                                    <div className="flex items-center justify-between px-3 py-2">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
                                            <Clock className="h-4 w-4" />
                                            Tìm kiếm gần đây
                                        </div>
                                        <button
                                            onClick={clearRecentSearches}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Xóa tất cả
                                        </button>
                                    </div>
                                    {recentSearches.map((search, index) => (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => handleSearch(search)}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors text-left"
                                        >
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span className="flex-1 text-sm text-gray-700">{search}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* No Results */}
                            {query.length >= 2 && suggestions.length === 0 && (
                                <div className="p-8 text-center text-gray-500">
                                    <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                    <p className="text-sm">Không tìm thấy sản phẩm nào</p>
                                    <p className="text-xs text-gray-400 mt-1">Thử tìm kiếm với từ khóa khác</p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
