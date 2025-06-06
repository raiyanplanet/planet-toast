import { ToastOptions } from "./types";
export declare const toast: {
    (message: string, options?: ToastOptions): string;
    success(message: string, options?: ToastOptions): string;
    error(message: string, options?: ToastOptions): string;
    loading(message: string, options?: ToastOptions): string;
    dismiss(id: string): void;
    remove(id: string): void;
    promise<T>(promise: Promise<T>, messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
    }, options?: ToastOptions): Promise<T>;
};
