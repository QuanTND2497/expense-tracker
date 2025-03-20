'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    TagIcon,
    ChartPieIcon,
    HomeIcon,
    ChevronRightIcon,
    Bars3Icon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Sidebar({ locale }: { locale: string }) {
    const { t } = useTranslation('common');
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function checkMobile() {
            setIsMobile(window.innerWidth < 768);
        }
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const menuItems = [
        { name: t('home'), icon: HomeIcon, href: `/${locale}` },
        { name: t('transactions'), icon: CurrencyDollarIcon, href: `/${locale}/transactions` },
        { name: t('categories'), icon: TagIcon, href: `/${locale}/categories` },
        { name: t('reports'), icon: ChartPieIcon, href: `/${locale}/reports` }
    ];

    function closeSidebar() {
        if (document.getElementById('sidebar-drawer')) {
            (
                document.getElementById('sidebar-drawer') as HTMLInputElement
            ).checked = false;
        }
    }

    function SidebarContent() {
        return (
            <div className="h-full bg-[#1a1d27] text-gray-300 w-64">
                {/* Logo */}
                <div className="p-3 flex items-center border-b border-gray-700/50">
                    <div className="bg-blue-500 text-white p-1.5 rounded-md mr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className="font-bold text-white">Expense App</div>
                        <div className="text-xs text-gray-400">
                            expense.yourapp.com
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <ul className="menu p-2 pt-4 w-full">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={
                                        isActive
                                            ? 'active bg-blue-600/20 text-blue-400'
                                            : ''
                                    }
                                    onClick={
                                        isMobile ? closeSidebar : undefined
                                    }
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                    {isActive && (
                                        <ChevronRightIcon className="h-4 w-4 ml-auto" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* User profile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700/50">
                    <div className="flex items-center p-2 rounded-md hover:bg-gray-700/30">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            U
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium text-white">
                                User
                            </div>
                            <div className="text-xs text-gray-400">
                                user@example.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile: DaisyUI drawer
    if (isMobile) {
        return (
            <div>
                <input
                    id="sidebar-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Mobile toggle button - Moved to the top-right corner with proper z-index and margin */}
                    <label
                        htmlFor="sidebar-drawer"
                        className="drawer-button btn btn-circle btn-primary btn-sm fixed top-4 left-4 z-50"
                        style={{ marginTop: '3.5rem' }}
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </label>
                </div>
                <div className="drawer-side z-[51]">
                    <label
                        htmlFor="sidebar-drawer"
                        className="drawer-overlay"
                    ></label>
                    <SidebarContent />
                </div>
            </div>
        );
    }

    // Desktop: Normal sidebar
    return <SidebarContent />;
}
