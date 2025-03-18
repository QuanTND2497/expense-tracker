import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import initTranslations from '@/app/i18n';
import { i18nNamespaces } from '@/constant/const';

export default async function ReportsPage({
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
            <h1 className="text-2xl font-bold mb-6">{t('reports')}</h1>

            {/* Loading animation while reports are being fetched */}
            <div className="flex items-center justify-center h-64">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
                    <div className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-primary border-b-transparent animate-spin animation-delay-200"></div>
                </div>
            </div>
        </div>
    );
}
