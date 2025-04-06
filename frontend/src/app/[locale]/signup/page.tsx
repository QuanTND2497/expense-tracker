import Link from 'next/link';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/header';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import SignupForm from '@/components/form/signup-form';

export const metadata: Metadata = {
    title: 'Sign Up | Expense Tracker',
    description: 'Create your account'
};

export default function SignupPage() {
    const t = useTranslations();

    return (
        <div className="flex flex-col min-h-screen">
            <Header showAuth={false} />
            
            <div className="flex-1 grid lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-emerald-900"></div>
                    <div className="relative z-20 flex items-center p-10">
                        <Link
                            href="/"
                            className="flex items-center text-lg font-medium"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-6 w-6"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            {t('common.expenseTracker')}
                        </Link>
                    </div>
                    <div className="relative z-20 px-10 mt-auto mb-20">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">
                                {t('features.trackAnalyzeSave')}
                            </h2>
                            <p className="text-base-foreground/80 text-lg">
                                {t('features.manageFinances')}
                            </p>
                            <ul className="space-y-2 text-base-foreground/80">
                                <li className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    {t('features.featureTrackExpenses')}
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    {t('features.featureCategories')}
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    {t('features.featureReports')}
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                    {t('features.featureBudgets')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {t('common.createAccount')}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t('common.enterDetails')}
                            </p>
                        </div>

                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-xl">{t('common.signUp')}</CardTitle>
                                <CardDescription>
                                    {t('features.manageFinances')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SignupForm />
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                                <div className="text-sm text-center text-muted-foreground">
                                    {t('common.bySigningUp')}{' '}
                                    <Link
                                        href="/terms"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        {t('common.termsOfService')}
                                    </Link>{' '}
                                    {t('common.and')}{' '}
                                    <Link
                                        href="/privacy"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        {t('common.privacyPolicy')}
                                    </Link>
                                </div>
                                <div className="text-sm text-center">
                                    {t('common.alreadyHaveAccount')}{' '}
                                    <Link
                                        href="/login"
                                        className="text-primary underline underline-offset-4 hover:text-primary/80"
                                    >
                                        {t('common.signIn')}
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
