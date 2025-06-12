"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface PostContextType {
    slug?: string;
    backgroundColor?: string;
    bilingualInfo?: {
        hasEn: boolean;
        hasZh: boolean;
    };
    onLanguageUnavailable?: (message: string) => void;
}

const PostContext = createContext<PostContextType>({});

export const usePost = () => useContext(PostContext);

interface PostProviderProps {
    children: ReactNode;
    slug?: string;
    backgroundColor?: string;
    bilingualInfo?: {
        hasEn: boolean;
        hasZh: boolean;
    };
    onLanguageUnavailable?: (message: string) => void;
}

export const PostProvider: React.FC<PostProviderProps> = ({
    children,
    slug,
    backgroundColor,
    bilingualInfo,
    onLanguageUnavailable,
}) => {
    return (
        <PostContext.Provider
            value={{
                slug,
                backgroundColor,
                bilingualInfo,
                onLanguageUnavailable,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}; 