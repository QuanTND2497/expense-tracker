import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import initTranslations from '@/app/i18n';

export default async function SignupPage({
    params
}: {
    params: { locale: string };
}) {
    const { locale } = await params;
    const { t } = await initTranslations(locale);
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/3 p-8 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
                <div className="max-w-md mx-auto h-full flex flex-col">
                    {/* Logo and Title */}
                    <div className="mb-12 text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {t('expenseTracker')}
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {t('createYourAccount')}
                        </h2>
                        <p className="text-blue-100 mb-8">
                            {t('alreadyHaveAccount')}
                            <Link
                                href="/login"
                                className="text-white hover:underline font-medium"
                            >
                                {t('logIn')}
                            </Link>
                        </p>

                        {/* Social Login Buttons */}
                        <div className="space-y-4 mb-8">
                            <button
                                type="button"
                                className="animate-button social-google w-full bg-white text-gray-700 rounded-lg px-6 py-3 flex items-center justify-center font-medium shadow-lg hover:shadow-xl"
                            >
                                <FcGoogle className="mr-3 text-xl" />
                                {t('continueWithGoogle')}
                            </button>
                            <button
                                type="button"
                                className="animate-button social-facebook w-full text-white rounded-lg px-6 py-3 flex items-center justify-center font-medium shadow-lg hover:shadow-xl"
                            >
                                <FaFacebook className="mr-3 text-xl" />
                                {t('continueWithFacebook')}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-blue-200/30"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 text-white bg-blue-500 rounded-full">
                                    {t('orWithEmail')}
                                </span>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">
                                    {t('fullName')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input-animated w-full px-4 py-3 bg-white/10 border border-blue-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-blue-100"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">
                                    {t('emailAddress')}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input-animated w-full px-4 py-3 bg-white/10 border border-blue-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-blue-100"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">
                                    {t('password')}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input-animated w-full px-4 py-3 bg-white/10 border border-blue-200/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-blue-100"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                            </div>

                            <button
                                type="submit"
                                className="animate-button white-bg w-full bg-white text-blue-600 rounded-lg px-6 py-3 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('createAccount')}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-8 text-sm text-blue-100 text-center">
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                {t('privacyPolicy')}
                            </a>
                            {' • '}
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                {t('termsOfService')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block lg:w-2/3 relative">
                <Image
                    src="/images/backgroundImage.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8 bg-black/50 rounded-2xl">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            {t('expenseTracker')}
                        </h2>
                        <p className="text-xl text-blue-100">
                            {t('startManagingFinances')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
