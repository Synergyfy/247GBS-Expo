"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    className?: string;
}

export default function Tooltip({ content, children, className = "" }: TooltipProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex items-center ${className}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
            }}
        >
            <span className="inline-flex items-center cursor-pointer select-none">
                {children}
            </span>

            {/* Mobile Responsive Tooltip Bubble */}
            <div
                role="tooltip"
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[260px] sm:max-w-xs px-2.5 py-1.5 bg-slate-900/95 text-white text-[11px] font-medium leading-relaxed rounded-lg shadow-xl border border-slate-800 backdrop-blur-xs transition-all duration-200 z-50 pointer-events-none break-words whitespace-normal text-center sm:text-left ${
                    isOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-1"
                }`}
            >
                {content}
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900/95" />
            </div>
        </div>
    );
}
