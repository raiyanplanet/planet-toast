import { Toast, ToastOptions, ToastType } from "./types";
type Listener = (toasts: Toast[]) => void;
declare class ToastStore {
    private toasts;
    private listeners;
    subscribe(listener: Listener): () => boolean;
    getSnapshot(): Toast[];
    private dispatch;
    private generateId;
    add(message: string, type: ToastType, options?: ToastOptions): string;
    dismiss(id: string): void;
    remove(id: string): void;
    clear(): void;
}
export declare const toastStore: ToastStore;
export {};
