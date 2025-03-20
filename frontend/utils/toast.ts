'use client';

import { toast, TypeOptions } from 'react-toastify';

/**
 * Hiển thị thông báo toast
 * @param message Nội dung thông báo
 * @param type Loại thông báo: success, error, info, warning
 */
export const showToast = (message: string, type: TypeOptions = 'info') => {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark', // Sử dụng dark theme theo yêu cầu
  });
};

/**
 * Hiển thị thông báo thành công
 * @param message Nội dung thông báo
 */
export const showSuccessToast = (message: string) => {
  showToast(message, 'success');
};

/**
 * Hiển thị thông báo lỗi
 * @param message Nội dung thông báo
 */
export const showErrorToast = (message: string) => {
  showToast(message, 'error');
};

/**
 * Hiển thị thông báo cảnh báo
 * @param message Nội dung thông báo
 */
export const showWarningToast = (message: string) => {
  showToast(message, 'warning');
};

/**
 * Hiển thị thông báo thông tin
 * @param message Nội dung thông báo
 */
export const showInfoToast = (message: string) => {
  showToast(message, 'info');
}; 