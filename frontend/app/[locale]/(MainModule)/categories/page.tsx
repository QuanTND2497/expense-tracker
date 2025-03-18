import { cookies } from 'next/headers';
import { i18nNamespaces } from '@/constant/const';
import { redirect } from 'next/navigation';
import initTranslations from '@/app/i18n';

export default async function CategoriesPage({
    params
}: {
    params: { locale: string };
}) {
    const { locale } = await params;

    // Check authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('next-auth.session-token')?.value;

    // If not authenticated, redirect to login
    if (!authToken) {
        redirect(`/${locale}/login`);
    }

    const { t } = await initTranslations(locale, i18nNamespaces);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{t('categories')}</h1>

            {/* Loading animation while categories are being fetched */}
            <div className="flex items-center justify-center h-64">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <div className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-secondary border-b-transparent animate-spin"></div>
                </div>
            </div>
        </div>
    );
}
