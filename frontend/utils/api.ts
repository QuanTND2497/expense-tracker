'use client';

import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Fetch API wrapper that automatically includes authentication token
 * @param endpoint - API endpoint (without the base URL)
 * @param options - Fetch options
 * @returns Promise with the response data
 */
export async function fetchAPI<T = unknown>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    // Get the token from NextAuth session or localStorage
    const session = await getSession();
    const accessToken =
        session?.user?.accessToken ||
        (typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : null);

    // Prepare headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {})
    };

    // Add authorization header if token exists
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Make the request
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include' // Include cookies
    });

    // Handle response
    if (!response.ok) {
        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
            // You could trigger a token refresh here
            // For now, just throw an error
            throw new Error('Unauthorized - Please log in again');
        }

        // Handle other errors
        const error = await response.json().catch(() => ({
            message: 'An unknown error occurred'
        }));

        throw new Error(error.message || 'API request failed');
    }

    // Return the data
    return response.json();
}
