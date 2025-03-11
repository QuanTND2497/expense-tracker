import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import initTranslations from '@/app/i18n';
import { redirect } from 'next/navigation';
import { handleGoogleSignup, handleFacebookSignup } from '@/constant/ultil';

export default async function SignupPage({
    params
}: {
    params: { locale: string };
}) {
    const { locale } = await params;
    const { t } = await initTranslations(locale);

    const handleSignup = async (formData: FormData) => {
        'use server';
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
            {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        if (response.ok) {
            redirect('/login');
        }
        return data;
    };

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
                            {t('createYourAccount')}
                        </h2>
                        <p className="text-base-content/70 mb-8">
                            {t('alreadyHaveAccount')}{' '}
                            <Link href="/login" className="link link-primary">
                                {t('logIn')}
                            </Link>
                        </p>

                        {/* Social Signup Buttons */}
                        <div className="space-y-4 mb-8">
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="btn btn-outline w-full gap-2"
                            >
                                <FcGoogle className="text-xl" />
                                {t('continueWithGoogle')}
                            </button>
                            <button
                                type="button"
                                onClick={handleFacebookSignup}
                                className="btn btn-primary w-full gap-2"
                            >
                                <FaFacebook className="text-xl" />
                                {t('continueWithFacebook')}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="divider">{t('orWithEmail')}</div>

                        {/* Signup Form */}
                        <form className="space-y-4" action={handleSignup}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        {t('fullName')}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        {t('emailAddress')}
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        {t('password')}
                                    </span>
                                    <span className="label-text-alt text-base-content/70">
                                        {t('minimumChars')}
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full"
                                    required
                                    minLength={8}
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    {t('createAccount')}
                                </button>
                            </div>
                        </form>

                        {/* Terms and Privacy */}
                        <p className="text-sm text-base-content/70 text-center mt-6">
                            {t('bySigningUp')}{' '}
                            <a href="#" className="link link-primary">
                                {t('termsOfService')}
                            </a>{' '}
                            {t('and')}{' '}
                            <a href="#" className="link link-primary">
                                {t('privacyPolicy')}
                            </a>
                        </p>
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
                                {t('startManagingFinances')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
