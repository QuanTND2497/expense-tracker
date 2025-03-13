import Header from './Header';

export default function Layout({
    children,
    isHeader = true
}: {
    children: React.ReactNode;
    isHeader?: boolean;
}) {
    return (
        <>
            {isHeader && <Header />}
            <div
                className="w-full h-full flex flex-col items-center justify-center mx-auto container "
                style={{
                    height: !isHeader ? '100%' : 'var(--header-height)'
                }}
            >
                {children}
            </div>
        </>
    );
}
