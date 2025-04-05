import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
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
    return (
        <div className="container relative h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details below to create your account
                        </p>
                    </div>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-xl">Sign up</CardTitle>
                            <CardDescription>
                                Start managing your expenses effectively
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignupForm />
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                            <div className="text-sm text-center text-muted-foreground">
                                By creating an account, you agree to our{' '}
                                <Link
                                    href="/terms"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/privacy"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                            <div className="text-sm text-center">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-emerald-900">
                    <Image
                        src="/images/signup-bg.jpg"
                        fill
                        alt="Create Account"
                        className="object-cover opacity-40"
                    />
                </div>
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
                        Expense Tracker
                    </Link>
                </div>
                <div className="relative z-20 px-10 mt-auto mb-20">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">
                            Track, Analyze, Save
                        </h2>
                        <p className="text-base-foreground/80 text-lg">
                            Get complete control over your finances with our
                            powerful expense tracking tools
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
                                Track expenses in multiple currencies
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
                                Visualize spending with intuitive reports
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
                                Set and manage budgets effectively
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
                                Secure cloud backup for your data
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
