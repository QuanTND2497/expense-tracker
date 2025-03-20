'use client';

/**
 * Định dạng ngày theo định dạng địa phương
 * @param dateString Chuỗi ISO date
 * @param locale Mã vùng, mặc định là 'vi-VN'
 * @returns Chuỗi đã định dạng
 */
export function formatDate(dateString: string, locale = 'vi-VN'): string {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
}

/**
 * Định dạng số tiền với ký hiệu tiền tệ
 * @param amount Chuỗi hoặc số tiền
 * @param currency Mã tiền tệ, mặc định là 'VND'
 * @param locale Mã vùng, mặc định là 'vi-VN'
 * @returns Chuỗi đã định dạng
 */
export function formatCurrency(
    amount: string | number,
    currency = 'VND',
    locale?: string
): string {
    try {
        const numAmount =
            typeof amount === 'string' ? parseFloat(amount) : amount;
            
        // Sử dụng locale từ trình duyệt nếu không được cung cấp
        const userLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : 'vi-VN');
        
        return new Intl.NumberFormat(userLocale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: currency === 'VND' ? 0 : 2,
            maximumFractionDigits: currency === 'VND' ? 0 : 2,
            useGrouping: true // Đảm bảo sử dụng dấu phân cách cho hàng nghìn
        }).format(numAmount);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return `${amount} ${currency}`;
    }
}
