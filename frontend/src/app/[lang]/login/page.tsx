'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFacebook, FaChevronDown } from 'react-icons/fa';
import { languages } from '../../../../config/languages';

export default function LoginPage() {
    const t = useTranslations('Login');
    const router = useRouter();
    const pathname = usePathname();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Get current locale from pathname
    const currentLocale = pathname.split('/')[1];
    const currentLang = languages[currentLocale as keyof typeof languages];

    const handleLanguageChange = (locale: string) => {
        setIsLangMenuOpen(false);
        const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
        router.push(newPath);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement login logic
        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleSocialLogin = () => {
        setIsLoading(true);
        // TODO: Implement social login logic
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen flex relative bg-base-300">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="btn btn-ghost gap-2"
                >
                    <span>{currentLang.flag}</span>
                    <span>{currentLang.name}</span>
                    <FaChevronDown
                        className={`transition-transform ${
                            isLangMenuOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                <AnimatePresence>
                    {isLangMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-base-200 ring-1 ring-black ring-opacity-5"
                        >
                            <div className="py-1">
                                {Object.entries(languages).map(
                                    ([locale, lang]) => (
                                        <button
                                            key={locale}
                                            onClick={() =>
                                                handleLanguageChange(locale)
                                            }
                                            className={`w-full px-4 py-2 text-sm hover:bg-base-300 flex items-center gap-2 ${
                                                locale === currentLocale
                                                    ? 'bg-primary/10'
                                                    : ''
                                            }`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span>{lang.name}</span>
                                        </button>
                                    )
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Left side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {t('welcome')}
                        </h2>
                        <p className="mt-2 text-sm text-base-content/70">
                            {t('signInToContinue')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        {t('email')}
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="input input-bordered w-full"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        {t('password')}
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="input input-bordered w-full"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                t('signIn')
                            )}
                        </button>
                    </form>

                    <div className="divider">{t('or')}</div>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleSocialLogin()}
                            className="btn btn-outline w-full"
                            disabled={isLoading}
                        >
                            <FaGoogle className="mr-2" />
                            {t('continueWithGoogle')}
                        </button>
                        <button
                            onClick={() => handleSocialLogin()}
                            className="btn btn-outline w-full"
                            disabled={isLoading}
                        >
                            <FaFacebook className="mr-2" />
                            {t('continueWithFacebook')}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/images/login-image.png"
                    alt="Login"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>
            </div>
        </div>
    );
}
