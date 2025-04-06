'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';

const locales = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' }
];

export function LanguageSwitcher() {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectLocale = (newLocale: string) => {
        // Remove the current locale from the path
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

        startTransition(() => {
            router.push(newPathname);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-9 h-9">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">{t('common.language')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((loc) => (
                    <DropdownMenuCheckboxItem
                        key={loc.value}
                        checked={locale === loc.value}
                        disabled={isPending}
                        onCheckedChange={() => onSelectLocale(loc.value)}
                    >
                        {t(`languages.${loc.value}`)}
                        {locale === loc.value && (
                            <Check className="ml-2 h-4 w-4" />
                        )}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
