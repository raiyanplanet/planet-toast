import { jsx, jsxs } from 'react/jsx-runtime';
import { useSyncExternalStore, useEffect } from 'react';

class ToastStore {
    constructor() {
        this.toasts = [];
        this.listeners = new Set();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    getSnapshot() {
        return this.toasts;
    }
    dispatch() {
        this.listeners.forEach((listener) => listener(this.toasts));
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    add(message, type, options = {}) {
        const id = options.id || this.generateId();
        const duration = options.duration ?? (type === "loading" ? 0 : 4000);
        const existingIndex = this.toasts.findIndex((t) => t.id === id);
        const toast = {
            id,
            message,
            type,
            duration,
            createdAt: Date.now(),
            visible: true,
        };
        if (existingIndex > -1) {
            this.toasts[existingIndex] = toast;
        }
        else {
            this.toasts = [toast, ...this.toasts];
        }
        this.dispatch();
        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }
        return id;
    }
    dismiss(id) {
        this.toasts = this.toasts.map((toast) => toast.id === id ? { ...toast, visible: false } : toast);
        this.dispatch();
        setTimeout(() => {
            this.toasts = this.toasts.filter((toast) => toast.id !== id);
            this.dispatch();
        }, 300);
    }
    remove(id) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
        this.dispatch();
    }
    clear() {
        this.toasts = [];
        this.dispatch();
    }
}
const toastStore = new ToastStore();

const toast = (message, options) => toastStore.add(message, "default", options);
toast.success = (message, options) => toastStore.add(message, "success", options);
toast.error = (message, options) => toastStore.add(message, "error", options);
toast.loading = (message, options) => toastStore.add(message, "loading", options);
toast.dismiss = (id) => toastStore.dismiss(id);
toast.remove = (id) => toastStore.remove(id);
toast.promise = (promise, messages, options) => {
    const id = toast.loading(messages.loading, options);
    promise
        .then((data) => {
        const successMsg = typeof messages.success === "function"
            ? messages.success(data)
            : messages.success;
        toast.success(successMsg, { ...options, id });
    })
        .catch((error) => {
        const errorMsg = typeof messages.error === "function"
            ? messages.error(error)
            : messages.error;
        toast.error(errorMsg, { ...options, id });
    });
    return promise;
};

const useToasts = () => {
    return useSyncExternalStore(toastStore.subscribe.bind(toastStore), toastStore.getSnapshot.bind(toastStore));
};

const ToastIcon = ({ type }) => {
    const baseStyle = {
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        fontSize: "14px",
        fontWeight: "bold",
        transition: "all 0.3s ease",
        transform: "scale(1)",
    };
    switch (type) {
        case "success":
            return (jsx("div", { style: {
                    ...baseStyle,
                    backgroundColor: "#10b981",
                    color: "white",
                    animation: "planet-toast-success 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }, children: "\u2713" }));
        case "error":
            return (jsx("div", { style: {
                    ...baseStyle,
                    backgroundColor: "#ef4444",
                    color: "white",
                    animation: "planet-toast-error 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }, children: "\u2715" }));
        case "loading":
            return (jsx("div", { style: {
                    ...baseStyle,
                    border: "2px solid #e5e7eb",
                    borderTopColor: "#3b82f6",
                    animation: "planet-toast-spin 1s linear infinite",
                } }));
        default:
            return (jsx("div", { style: {
                    ...baseStyle,
                    backgroundColor: "#6b7280",
                    color: "white",
                    animation: "planet-toast-info 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }, children: "\u2139" }));
    }
};

const ToastItem = ({ toast: toastData, offset, reverseOrder, }) => {
    const handleDismiss = () => {
        toast.dismiss(toastData.id);
    };
    const getTypeStyles = (type) => {
        switch (type) {
            case "success":
                return {
                    backgroundColor: "#f0fdf4",
                    borderColor: "#22c55e",
                    color: "#15803d",
                    iconBg: "#10b981",
                };
            case "error":
                return {
                    backgroundColor: "#fef2f2",
                    borderColor: "#ef4444",
                    color: "#dc2626",
                    iconBg: "#ef4444",
                };
            case "loading":
                return {
                    backgroundColor: "#eff6ff",
                    borderColor: "#3b82f6",
                    color: "#1d4ed8",
                    iconBg: "#3b82f6",
                };
            default:
                return {
                    backgroundColor: "#ffffff",
                    borderColor: "#e5e7eb",
                    color: "#374151",
                    iconBg: "#6b7280",
                };
        }
    };
    const typeStyles = getTypeStyles(toastData.type);
    const factor = reverseOrder ? -1 : 1;
    const transform = toastData.visible
        ? `translateY(${offset * factor}px) scale(1)`
        : "translateY(-50px) scale(0.95)";
    return (jsx("div", { style: {
            position: "absolute",
            left: "50%",
            transform: `translateX(-50%) ${transform}`,
            opacity: toastData.visible ? 1 : 0,
            transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            zIndex: 9999,
            pointerEvents: toastData.visible ? "auto" : "none",
            willChange: "transform, opacity",
        }, children: jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                minWidth: "320px",
                maxWidth: "500px",
                fontSize: "14px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                ...typeStyles,
            }, onClick: handleDismiss, children: [jsx(ToastIcon, { type: toastData.type }), jsx("div", { style: { flex: 1, wordBreak: "break-word", lineHeight: "1.5" }, children: toastData.message }), jsx("button", { style: {
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        opacity: 0.5,
                        fontSize: "16px",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        transition: "all 0.2s ease",
                        color: typeStyles.color,
                    }, onMouseEnter: (e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
                    }, onMouseLeave: (e) => {
                        e.currentTarget.style.opacity = "0.5";
                        e.currentTarget.style.backgroundColor = "transparent";
                    }, onClick: (e) => {
                        e.stopPropagation();
                        handleDismiss();
                    }, children: "\u2715" })] }) }));
};

const Toaster = ({ position = "top-center", reverseOrder = false, gutter = 8, containerStyle, toastOptions, }) => {
    const toasts = useToasts();
    useEffect(() => {
        // Inject CSS animations
        const style = document.createElement("style");
        style.textContent = `
      @keyframes planet-toast-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes planet-toast-success {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes planet-toast-error {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes planet-toast-info {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      @keyframes planet-toast-slide-in {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes planet-toast-slide-out {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    const getPositionStyles = () => {
        const [vertical, horizontal] = position.split("-");
        const styles = {
            position: "fixed",
            zIndex: 9999,
            pointerEvents: "none",
            padding: "16px",
            maxWidth: "100vw",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: `${gutter}px`,
        };
        if (vertical === "top") {
            styles.top = 0;
            styles.animation = "planet-toast-slide-in 0.3s ease-out";
        }
        else {
            styles.bottom = 0;
            styles.animation = "planet-toast-slide-in 0.3s ease-out";
        }
        if (horizontal === "left") {
            styles.alignItems = "flex-start";
        }
        else if (horizontal === "right") {
            styles.alignItems = "flex-end";
        }
        return styles;
    };
    const visibleToasts = toasts.filter((toast) => toast.visible);
    const orderedToasts = reverseOrder
        ? [...visibleToasts].reverse()
        : visibleToasts;
    return (jsx("div", { style: { ...getPositionStyles(), ...containerStyle }, children: orderedToasts.map((toast, index) => (jsx(ToastItem, { toast: toast, offset: index * (60 + gutter), reverseOrder: reverseOrder }, toast.id))) }));
};

export { Toaster, toast, useToasts };
//# sourceMappingURL=index.esm.js.map
