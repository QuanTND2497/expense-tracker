'use client';

import { useEffect, useState } from 'react';
import { IoCheckmarkCircle, IoInformationCircle, IoWarning, IoCloseCircle } from 'react-icons/io5';
import FadeTransition from './FadeTransition';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastProps {
  type?: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export default function ToastNotification({
  type = 'info',
  message,
  duration = 3000,
  onClose
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleExited = () => {
    onClose?.();
  };

  if (!mounted) return null;

  const iconMap = {
    success: <IoCheckmarkCircle className="w-5 h-5 text-success" />,
    info: <IoInformationCircle className="w-5 h-5 text-info" />,
    warning: <IoWarning className="w-5 h-5 text-warning" />,
    error: <IoCloseCircle className="w-5 h-5 text-error" />
  };

  const bgColorMap = {
    success: 'bg-success/10 border-success/30',
    info: 'bg-info/10 border-info/30',
    warning: 'bg-warning/10 border-warning/30',
    error: 'bg-error/10 border-error/30'
  };

  return (
    <FadeTransition 
      show={visible} 
      duration={400} 
      className="fixed top-4 right-4 z-50"
      onExited={handleExited}
    >
      <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border ${bgColorMap[type]} backdrop-blur-sm max-w-md`}>
        <div className="flex-shrink-0">
          {iconMap[type]}
        </div>
        <div className="flex-grow text-sm">
          {message}
        </div>
        <button onClick={handleClose} className="flex-shrink-0 p-1 rounded-full hover:bg-base-content/10 transition-colors">
          <IoCloseCircle className="w-5 h-5 text-base-content/60" />
        </button>
      </div>
    </FadeTransition>
  );
} 