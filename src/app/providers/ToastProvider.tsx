import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Toast } from '../../types';
import { Toaster, toast as sonnerToast } from 'sonner';

interface ToastContextType {
  toasts: Toast[];
  toast: (options: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    // Use sonner for native toast
    sonnerToast(options.title, {
      description: options.description,
      duration: options.duration || 5000,
      style: {
        background: options.type === 'error' ? '#ef4444' : 
                   options.type === 'warning' ? '#f59e0b' : 
                   options.type === 'success' ? '#22c55e' : '#3b82f6',
      }
    });

    const newToast: Toast = { ...options, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration || 5000);

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster position="top-right" richColors />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

