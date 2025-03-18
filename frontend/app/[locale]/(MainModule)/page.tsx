import { redirect } from 'next/navigation';
import initTranslations from '@/app/i18n';
import { cookies } from 'next/headers';
import { i18nNamespaces } from '@/constant/const';

export default async function Home({ params }: { params: { locale: string } }) {
    const { locale } = await params;

    // Kiểm tra đăng nhập bằng cookie hoặc session
    const cookieStore = await cookies();
    const authToken = cookieStore.get('next-auth.session-token')?.value;

    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!authToken) {
        redirect(`/${locale}/login`);
    }

    const { t } = await initTranslations(locale, i18nNamespaces);

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
                </div>

                {/* Dashboard content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-base-200 p-6 rounded-xl shadow-lg border border-base-300 hover:border-primary transition-all duration-300">
                        <h2 className="text-lg font-semibold mb-3">
                            {t('recent_expenses')}
                        </h2>
                        <div className="text-center py-8">
                            <div className="inline-block p-4 rounded-full bg-primary/10">
                                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                            </div>
                            <p className="mt-4 text-sm opacity-70">
                                {t('loading')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-base-200 p-6 rounded-xl shadow-lg border border-base-300 hover:border-secondary transition-all duration-300">
                        <h2 className="text-lg font-semibold mb-3">
                            {t('monthly_summary')}
                        </h2>
                        <div className="text-center py-8">
                            <div className="inline-block p-4 rounded-full bg-secondary/10">
                                <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
                            </div>
                            <p className="mt-4 text-sm opacity-70">
                                {t('loading')}
                            </p>
                        </div>
                    </div>

                    <div className="bg-base-200 p-6 rounded-xl shadow-lg border border-base-300 hover:border-accent transition-all duration-300">
                        <h2 className="text-lg font-semibold mb-3">
                            {t('top_categories')}
                        </h2>
                        <div className="text-center py-8">
                            <div className="inline-block p-4 rounded-full bg-accent/10">
                                <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
                            </div>
                            <p className="mt-4 text-sm opacity-70">
                                {t('loading')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
