import { Toast, ToastOptions, ToastType } from "./types";

type Listener = (toasts: Toast[]) => void;

class ToastStore {
  private toasts: Toast[] = [];
  private listeners: Set<Listener> = new Set();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot() {
    return this.toasts;
  }

  private dispatch() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  add(message: string, type: ToastType, options: ToastOptions = {}) {
    const id = options.id || this.generateId();
    const duration = options.duration ?? (type === "loading" ? 0 : 4000);

    const existingIndex = this.toasts.findIndex((t) => t.id === id);

    const toast: Toast = {
      id,
      message,
      type,
      duration,
      createdAt: Date.now(),
      visible: true,
    };

    if (existingIndex > -1) {
      this.toasts[existingIndex] = toast;
    } else {
      this.toasts = [toast, ...this.toasts];
    }

    this.dispatch();

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.map((toast) =>
      toast.id === id ? { ...toast, visible: false } : toast
    );
    this.dispatch();

    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
      this.dispatch();
    }, 300);
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.dispatch();
  }

  clear() {
    this.toasts = [];
    this.dispatch();
  }
}

export const toastStore = new ToastStore();
