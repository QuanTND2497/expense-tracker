import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Categories from '@/container/categories';
import { i18nNamespaces } from '@/constant/const';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/providers/TranslationsProvider';

export default async function CategoriesPage({
    params
}: {
    params: { locale: string };
}) {
    const { locale } = await params;
    const { resources } = await initTranslations(locale, ['categories']);

    // Check authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('next-auth.session-token')?.value;

    // If not authenticated, redirect to login
    if (!authToken) {
        redirect(`/${locale}/login`);
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-base-300">
                <TranslationsProvider
                    namespaces={['categories', ...i18nNamespaces]}
                    locale={locale}
                    resources={resources}
                >
                    <Categories />
                </TranslationsProvider>
            </div>
        </div>
    );
}
