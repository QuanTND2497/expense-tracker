'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function SignupForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const t = useTranslations();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        // Form validation
        if (!name || !email || !password || !confirmPassword) {
            setError(t('validation.required'));
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError(t('validation.passwordsDoNotMatch'));
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError(t('validation.passwordMinLength'));
            setIsLoading(false);
            return;
        }

        try {
            // Replace with your actual registration logic
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || t('auth.errorOccurred'));
            }

            // Redirect to login on success
            router.push('/login?registered=true');
            router.refresh();
        } catch (err) {
            console.error('Registration error:', err);
            setError(
                err instanceof Error ? err.message : t('auth.errorOccurred')
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="name">{t('common.fullName')}</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">{t('common.email')}</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">{t('common.password')}</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                    {t('common.confirmPassword')}
                </Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    required
                />
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('common.processing')}
                    </>
                ) : (
                    t('common.createAccount')
                )}
            </Button>
        </form>
    );
}
