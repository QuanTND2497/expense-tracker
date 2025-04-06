import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/theme-toggle';

export function Header({ showAuth = true }: { showAuth?: boolean }) {
    const t = useTranslations();

    return (
        <header className="border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        <span className="font-bold">
                            {t('common.expenseTracker')}
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6">
                        {showAuth && (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    {t('common.signIn')}
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
                                >
                                    {t('common.signUp')}
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
