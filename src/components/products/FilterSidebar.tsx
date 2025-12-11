"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "@/lib/api/product.service";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/lib/store/filter.store";
import {
    PRICE_RANGES,
    CPU_OPTIONS,
    RAM_OPTIONS,
    STORAGE_OPTIONS,
    SCREEN_SIZE_OPTIONS,
    GPU_OPTIONS,
} from "@/types/filters";
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export function FilterSidebar() {
    const {
        brands,
        priceRange,
        cpu,
        ram,
        storage,
        screenSize,
        gpu,
        toggleBrand,
        setPriceRange,
        toggleCpu,
        toggleRam,
        toggleStorage,
        toggleScreenSize,
        toggleGpu,
        clearFilters,
        hasActiveFilters,
        getActiveFilterCount,
    } = useFilterStore();

    const [customPriceMin, setCustomPriceMin] = useState(priceRange.min);
    const [customPriceMax, setCustomPriceMax] = useState(priceRange.max);

    // Fetch brands
    const { data: brandsData } = useQuery({
        queryKey: ["brands"],
        queryFn: () => getAllBrands({ page: 1, limit: 100 }),
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN").format(price) + " đ";
    };

    const handlePriceRangeClick = (min: number, max: number) => {
        setPriceRange(min, max);
        setCustomPriceMin(min);
        setCustomPriceMax(max);
    };

    const handleCustomPriceChange = () => {
        setPriceRange(customPriceMin, customPriceMax);
    };

    const activeCount = getActiveFilterCount();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 p-3 space-y-3"
        >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        🔍 Bộ lọc
                    </h2>
                    {activeCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-primary-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
                        >
                            {activeCount}
                        </motion.span>
                    )}
                </div>
                {activeCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                        Xóa tất cả
                    </button>
                )}
            </div>

            <Accordion type="multiple" defaultValue={["price", "brand"]} className="w-full">
                {/* Price Range Filter */}
                <AccordionItem value="price" className="border-none">
                    <AccordionTrigger className="text-xs font-semibold hover:no-underline py-2">
                        <span className="flex items-center gap-2">
                            💰 Khoảng giá
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-2">
                            {PRICE_RANGES.map((range, index) => (
                                <motion.button
                                    key={range.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    onClick={() => handlePriceRangeClick(range.min, range.max)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${priceRange.min === range.min && priceRange.max === range.max
                                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md"
                                        : "hover:bg-gray-50 border border-transparent hover:border-gray-200"
                                        }`}
                                >
                                    {range.label}
                                </motion.button>
                            ))}

                            {/* Custom Price Range */}
                            <div className="pt-3 mt-3 border-t">
                                <p className="text-xs text-gray-600 mb-2 font-medium">Tùy chỉnh:</p>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        value={customPriceMin}
                                        onChange={(e) => setCustomPriceMin(Number(e.target.value))}
                                        className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Từ"
                                    />
                                    <span className="text-sm text-gray-400">-</span>
                                    <input
                                        type="number"
                                        value={customPriceMax}
                                        onChange={(e) => setCustomPriceMax(Number(e.target.value))}
                                        className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Đến"
                                    />
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        size="sm"
                                        className="w-full mt-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                                        onClick={handleCustomPriceChange}
                                    >
                                        Áp dụng
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Brand Filter */}
                <AccordionItem value="brand" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                            🏷️ Thương hiệu
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 max-h-64 overflow-y-auto pt-2 pr-2">
                            {brandsData?.result.map((brand, index) => (
                                <motion.div
                                    key={brand.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`brand-${brand.id}`}
                                        checked={brands.includes(brand.id)}
                                        onCheckedChange={() => toggleBrand(brand.id)}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                                    />
                                    <label
                                        htmlFor={`brand-${brand.id}`}
                                        className="text-xs cursor-pointer flex-1 font-medium"
                                    >
                                        {brand.name}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* CPU Filter */}
                <AccordionItem value="cpu" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                            🖥️ Bộ xử lý (CPU)
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 max-h-64 overflow-y-auto pt-2 pr-2">
                            {CPU_OPTIONS.map((cpuOption, index) => (
                                <motion.div
                                    key={cpuOption}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`cpu-${cpuOption}`}
                                        checked={cpu.includes(cpuOption)}
                                        onCheckedChange={() => toggleCpu(cpuOption)}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                                    />
                                    <label
                                        htmlFor={`cpu-${cpuOption}`}
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        {cpuOption}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* RAM Filter */}
                <AccordionItem value="ram" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                            💾 RAM
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-2">
                            {RAM_OPTIONS.map((ramOption, index) => (
                                <motion.div
                                    key={ramOption}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`ram-${ramOption}`}
                                        checked={ram.includes(ramOption)}
                                        onCheckedChange={() => toggleRam(ramOption)}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                                    />
                                    <label
                                        htmlFor={`ram-${ramOption}`}
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        {ramOption}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Storage Filter */}
                <AccordionItem value="storage" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                            💿 Ổ cứng
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-2">
                            {STORAGE_OPTIONS.map((storageOption, index) => (
                                <motion.div
                                    key={storageOption}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`storage-${storageOption}`}
                                        checked={storage.includes(storageOption)}
                                        onCheckedChange={() => toggleStorage(storageOption)}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                                    />
                                    <label
                                        htmlFor={`storage-${storageOption}`}
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        {storageOption}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Screen Size Filter */}
                <AccordionItem value="screen" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                            📺 Kích thước màn hình
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-2">
                            {SCREEN_SIZE_OPTIONS.map((size, index) => (
                                <motion.div
                                    key={size}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`screen-${size}`}
                                        checked={screenSize.includes(size)}
                                        onCheckedChange={() => toggleScreenSize(size)}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                                    />
                                    <label
                                        htmlFor={`screen-${size}`}
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        {size}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* GPU Filter */}
                <AccordionItem value="gpu" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                            🎮 Card đồ họa (GPU)
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 max-h-64 overflow-y-auto pt-2 pr-2">
                            {GPU_OPTIONS.map((gpuOption, index) => (
                                <motion.div
                                    key={gpuOption}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Checkbox
                                        id={`gpu-${gpuOption}`}
                                        checked={gpu.includes(gpuOption)}
                                        onCheckedChange={() => toggleGpu(gpuOption)}
                                        className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
                                    />
                                    <label
                                        htmlFor={`gpu-${gpuOption}`}
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        {gpuOption}
                                    </label>
                                </motion.div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </motion.div>
    );
}
