import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import initTranslations from '@/app/i18n';
import LoginForm from '@/components/LoginForm';
import TranslationsProvider from '@/components/TranslationsProvider';
import { i18nNamespaces } from '../page';
import { handleGoogleSignup, handleFacebookSignup } from '@/constant/ultil';

export default async function LoginPage({
    params
}: {
    params: { locale: string };
}) {
    const { locale } = params;
    const { t, resources } = await initTranslations(locale);

    return (
        <div className="overflow-hidden flex bg-base-200 w-full">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/3 p-8 overflow-y-auto">
                <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
                    <div className="card-body">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold">
                                {t('expenseTracker')}
                            </h1>
                        </div>

                        <h2 className="card-title text-3xl mb-2">
                            {t('login')}
                        </h2>
                        <p className="text-base-content/70 mb-8">
                            {t('noAccount')}{' '}
                            <Link href="/signup" className="link link-primary">
                                {t('signUp')}
                            </Link>
                        </p>

                        {/* Social Login Buttons */}
                        <div className="space-y-4 mb-8">
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="btn btn-outline w-full"
                            >
                                <FcGoogle className="text-xl" />
                                {t('continueWithGoogle')}
                            </button>
                            <button
                                type="button"
                                onClick={handleFacebookSignup}
                                className="btn btn-primary w-full"
                            >
                                <FaFacebook className="text-xl" />
                                {t('continueWithFacebook')}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="divider">{t('orWithEmail')}</div>

                        {/* Email Form */}
                        <TranslationsProvider
                            namespaces={i18nNamespaces}
                            locale={locale}
                            resources={resources}
                        >
                            <LoginForm />
                        </TranslationsProvider>

                        {/* Footer Links */}
                        <div className="text-sm text-base-content/70 text-center mt-8">
                            <a href="#" className="link link-hover">
                                {t('privacyPolicy')}
                            </a>
                            {' • '}
                            <a href="#" className="link link-hover">
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
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-base-300/50">
                    <div className="card bg-base-100 bg-opacity-90 max-w-md">
                        <div className="card-body text-center">
                            <h2 className="card-title text-4xl justify-center mb-4">
                                {t('expenseTracker')}
                            </h2>
                            <p className="text-xl text-base-content/80">
                                {t('manageFinances')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
