"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Option {
    code: string;
    name: string;
    type: string;
}

interface LocationSelectProps {
    label: string;
    value: string;
    onChange: (value: string, option: Option) => void;
    options: Option[];
    isLoading?: boolean;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
    searchable?: boolean;
}

export function LocationSelect({
    label,
    value,
    onChange,
    options,
    isLoading = false,
    disabled = false,
    error,
    placeholder = "Chọn...",
    searchable = true,
}: LocationSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const selectedOption = options.find(opt => opt.name === value);

    const filteredOptions = searchable && searchQuery
        ? options.filter(opt =>
            opt.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options;

    useEffect(() => {
        if (!isOpen) {
            setSearchQuery("");
        }
    }, [isOpen]);

    const handleSelect = (option: Option) => {
        onChange(option.name, option);
        setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("", { code: "", name: "", type: "" });
    };

    return (
        <div className="relative">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} <span className="text-red-500">*</span>
            </label>

            {/* Select Button */}
            <button
                type="button"
                onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
                disabled={disabled || isLoading}
                className={cn(
                    "w-full px-4 py-2.5 text-left bg-white border rounded-lg transition-all",
                    "flex items-center justify-between",
                    error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
                    disabled && "bg-gray-50 cursor-not-allowed",
                    isLoading && "cursor-wait"
                )}
            >
                <span className={cn(
                    "flex-1",
                    !value && "text-gray-400"
                )}>
                    {isLoading ? "Đang tải..." : (selectedOption ? selectedOption.name : placeholder)}
                </span>

                <div className="flex items-center gap-2">
                    {value && !disabled && !isLoading && (
                        <X
                            className="h-4 w-4 text-gray-400 hover:text-gray-600"
                            onClick={handleClear}
                        />
                    )}
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    ) : (
                        <ChevronDown className={cn(
                            "h-4 w-4 text-gray-400 transition-transform",
                            isOpen && "transform rotate-180"
                        )} />
                    )}
                </div>
            </button>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-500"
                >
                    {error}
                </motion.p>
            )}

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Options */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden"
                        >
                            {/* Search */}
                            {searchable && (
                                <div className="p-2 border-b">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Tìm kiếm..."
                                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Options List */}
                            <div className="overflow-y-auto max-h-64">
                                {filteredOptions.length === 0 ? (
                                    <div className="p-4 text-center text-sm text-gray-500">
                                        Không tìm thấy kết quả
                                    </div>
                                ) : (
                                    filteredOptions.map((option, index) => (
                                        <motion.button
                                            key={option.code}
                                            type="button"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.02 }}
                                            onClick={() => handleSelect(option)}
                                            className={cn(
                                                "w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors",
                                                "flex items-center justify-between",
                                                value === option.name && "bg-primary/5"
                                            )}
                                        >
                                            <span className="text-sm">{option.name}</span>
                                            {value === option.name && (
                                                <Check className="h-4 w-4 text-primary" />
                                            )}
                                        </motion.button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
