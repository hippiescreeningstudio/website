"use client";

import { useEffect } from "react";

interface NotificationProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export function Notification({ message, isVisible, onClose }: NotificationProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className="bg-neutral-700 border border-neutral-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{message}</p>
                    <button
                        onClick={onClose}
                        className="ml-2 text-gray-300 hover:text-white"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
