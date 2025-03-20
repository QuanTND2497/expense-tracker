'use client';

export default function TransactionLoading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <div className="h-8 bg-base-300 rounded-md w-52 animate-pulse"></div>
                    <div className="h-4 bg-base-300 rounded-md w-40 animate-pulse mt-2"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-10 bg-base-300 rounded-md w-32 animate-pulse"></div>
                    <div className="h-10 bg-base-300 rounded-md w-40 animate-pulse"></div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="bg-base-200">
                                <div className="h-4 bg-base-300 rounded-md w-20 animate-pulse"></div>
                            </th>
                            <th className="bg-base-200">
                                <div className="h-4 bg-base-300 rounded-md w-32 animate-pulse"></div>
                            </th>
                            <th className="bg-base-200">
                                <div className="h-4 bg-base-300 rounded-md w-24 animate-pulse"></div>
                            </th>
                            <th className="bg-base-200 text-right">
                                <div className="h-4 bg-base-300 rounded-md w-20 animate-pulse ml-auto"></div>
                            </th>
                            <th className="bg-base-200 text-right">
                                <div className="h-4 bg-base-300 rounded-md w-16 animate-pulse ml-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="bg-base-100">
                                <td>
                                    <div className="h-6 bg-base-300 rounded-md w-24 animate-pulse"></div>
                                </td>
                                <td>
                                    <div className="h-6 bg-base-300 rounded-md w-40 animate-pulse"></div>
                                </td>
                                <td>
                                    <div className="h-6 bg-base-300 rounded-md w-28 animate-pulse"></div>
                                </td>
                                <td className="text-right">
                                    <div className="h-6 bg-base-300 rounded-md w-28 animate-pulse ml-auto"></div>
                                </td>
                                <td className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <div className="h-8 bg-base-300 rounded-md w-8 animate-pulse"></div>
                                        <div className="h-8 bg-base-300 rounded-md w-8 animate-pulse"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
