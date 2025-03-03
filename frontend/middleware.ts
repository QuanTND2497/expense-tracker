import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from './config/i18n.config';

const locales = ['en-US', 'vi-VN', 'vi'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
    const acceptLanguage = request.headers.get('accept-language');
    if (!acceptLanguage) return defaultLocale;
    const languages = acceptLanguage.split(',');
    const language = languages[0];
    return language;
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)'
        // Optional: only run on root (/) URL
        // '/'
    ]
};
