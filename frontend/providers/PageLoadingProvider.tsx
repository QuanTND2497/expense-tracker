'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react';
import PageLoading from '@/components/PageLoading';

interface PageLoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(
    undefined
);

export function usePageLoading() {
    const context = useContext(PageLoadingContext);
    if (!context) {
        throw new Error(
            'usePageLoading must be used within a PageLoadingProvider'
        );
    }
    return context;
}

interface PageLoadingProviderProps {
    children: ReactNode;
}

export function PageLoadingProvider({ children }: PageLoadingProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
        null
    );
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Function to manually set loading state
    const setLoading = (loading: boolean) => {
        if (loading) {
            setIsLoading(true);
        } else {
            // Add slight delay before hiding to prevent flickering for quick loads
            if (loadingTimeout) clearTimeout(loadingTimeout);
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            setLoadingTimeout(timeout);
        }
    };

    useEffect(() => {
        setMounted(true);

        // Clean up timeout on unmount
        return () => {
            if (loadingTimeout) clearTimeout(loadingTimeout);
        };
    }, [loadingTimeout]);

    // Track route changes to show loading state
    useEffect(() => {
        if (!mounted) return;

        // Get the original push and replace methods
        const originalPush = router.push;
        const originalReplace = router.replace;

        // Override router methods to track navigation
        router.push = (...args: Parameters<typeof originalPush>) => {
            setLoading(true);
            return originalPush(...args);
        };

        router.replace = (...args: Parameters<typeof originalReplace>) => {
            setLoading(true);
            return originalReplace(...args);
        };

        // Reset methods on unmount
        return () => {
            router.push = originalPush;
            router.replace = originalReplace;
        };
    }, [router, mounted]);

    // Route change completed
    useEffect(() => {
        if (mounted) {
            setLoading(false);
        }
    }, [pathname, mounted]);

    return (
        <PageLoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
            {isLoading && <PageLoading />}
        </PageLoadingContext.Provider>
    );
}
