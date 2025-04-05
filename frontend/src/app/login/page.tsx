import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/form/login-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export const metadata = {
    title: 'Login | Expense Tracker',
    description: 'Login to your account'
};

export default function LoginPage() {
    return (
        <div className="container relative h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900">
                    <Image
                        src="/images/login-bg.jpg"
                        fill
                        alt="Authentication"
                        className="object-cover opacity-30"
                    />
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">
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
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &quot;Track your expenses effortlessly, gain insights
                            into your spending habits, and take control of your
                            financial future with our comprehensive expense
                            tracking solution.&quot;
                        </p>
                        <footer className="text-sm">
                            Team Expense Tracker
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login to your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-xl">Sign in</CardTitle>
                            <CardDescription>
                                Choose your preferred sign in method
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <LoginForm />

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="w-full">
                                    <svg
                                        className="mr-2 h-4 w-4"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                            fill="#EA4335"
                                        />
                                        <path
                                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                            fill="#34A853"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <svg
                                        className="mr-2 h-4 w-4 fill-current"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 16.06 4.66 19.36 8.44 20.78C8.94 20.88 9.12 20.56 9.12 20.32C9.12 20.08 9.12 19.42 9.1 18.58C6.32 19.18 5.82 17.18 5.82 17.18C5.42 16.08 4.82 15.78 4.82 15.78C4 15.18 4.9 15.18 4.9 15.18C5.8 15.24 6.28 16.18 6.28 16.18C7.1 17.7 8.5 17.2 9.14 17C9.24 16.38 9.5 15.96 9.78 15.72C7.52 15.48 5.14 14.62 5.14 11.12C5.14 10.08 5.5 9.21998 6.3 8.57998C6.2 8.33998 5.86 7.33998 6.4 6.03998C6.4 6.03998 7.18 5.79998 9.1 7.09998C9.98 6.89998 10.88 6.79998 11.8 6.79998C12.72 6.79998 13.62 6.89998 14.5 7.09998C16.42 5.79998 17.2 6.03998 17.2 6.03998C17.74 7.33998 17.4 8.33998 17.3 8.57998C18.1 9.21998 18.46 10.08 18.46 11.12C18.46 14.62 16.08 15.48 13.8 15.72C14.16 16.02 14.5 16.62 14.5 17.52C14.5 18.86 14.48 19.98 14.48 20.32C14.48 20.56 14.66 20.88 15.16 20.78C18.94 19.36 21.6 16.06 21.6 12.06C21.6 6.52998 17.1 2.03998 12 2.03998Z" />
                                    </svg>
                                    GitHub
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <p className="mt-2 text-center text-sm text-muted-foreground">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
