import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { i18nNamespaces } from '@/constant/const';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/providers/TranslationsProvider';
import Transactions from '@/container/transactions';

export default async function TransactionsPage({
    params
}: {
    params: { locale: string };
}) {
    const { locale } = await params;
    const { resources } = await initTranslations(locale, [
        'transactions',
        ...i18nNamespaces
    ]);

    // Kiểm tra xác thực
    const cookieStore = await cookies();
    const authToken = cookieStore.get('next-auth.session-token')?.value;

    // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
    if (!authToken) {
        redirect(`/${locale}/login`);
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="bg-base-100/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-base-300">
                <TranslationsProvider
                    namespaces={['transactions', ...i18nNamespaces]}
                    locale={locale}
                    resources={resources}
                >
                    <Transactions />
                </TranslationsProvider>
            </div>
        </div>
    );
} 